<template>
  <view class="mask" v-if="showCalendar" @click.stop="cancel">
    <view class="calendar">
      <view class="safe-area-inset-bottom content" @tap.stop>
        <view class="title">
          <view class="switch">
            <view class="left" :class="{ active: type === 'solar' }" @click="switchBtn('solar')">公历</view>
            <view class="right" :class="{ active: type === 'lunar' }" @click="switchBtn('lunar')">农历</view>
            <view class="bg" :class="type"></view>
          </view>
          <!-- <view class="ignore-year">忽略年份</view> -->
        </view>
        <picker-view :indicator-style="indicatorStyle" :value="selectValue" @change="bindChange">
          <picker-view-column>
            <view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item, index) in months" :key="index">{{ item }}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item, index) in days" :key="index">{{ item }}</view>
          </picker-view-column>
          <picker-view-column v-if="isHourShow">
            <view class="item" v-for="(item, index) in lunarHour" :key="index">{{
              isActive ? item.solar : item.label
            }}</view>
          </picker-view-column>
        </picker-view>
        <view class="bottom" v-if="isSwitch">
          <view class="left" @click="cancel">取消</view>
          <view class="right" @click="sure">确定</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import conversion from './calendar.js'
import lunarHour from './information.js'
export default {
  name: 'calendar',
  data() {
    return {
      oldYear: 1950, // 最大年份
      type: 'solar', // lunar农历，solar公历
      isActive: true, // true公历
      showData: '', // 显示数据
      checked: true,
      years: [],
      months: [],
      days: [],
      indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`,
      lunarHour: [],
      date: '',
      hour: '',
      leap_month: 0, // 1为闰月0为非闰月
      sureYear: new Date().getFullYear(), // 默认弹出显示年份
      sureMonth: new Date().getMonth() + 1, // 默认弹出显示月份
      selectValue: [48, 9, 15, 1], // 默认弹出选择的状态1998-10-16 0 [y, m, d, h]
      showYear: '',
      showMonth: '',
      nextFinally: true,
    }
  },
  props: {
    showCalendar: {
      type: Boolean,
      default: () => false,
    },
    isHourShow: {
      type: Boolean,
      default: false,
    },
    isSwitch: {
      type: Boolean,
      default: true,
    },
    selectOptions: {
      type: Array,
      default: () => [48, 9, 15, 1],
    },
  },
  watch: {
    showCalendar(newVal, oldVal) {
      if (newVal) this.getTime()
    },
    selectOptions(newVal, oldVal) {
      console.log('修改了默认值需要回显', newVal)
      this.selectValue = newVal
    },
  },
  created() {
    // this.getTime()
  },
  mounted() {},
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    // 提交
    sure() {
      if (!this.nextFinally) {
        console.log('别着急，正在选时间')
        return false
      }
      let data = {
        text: this.showData, // 显示数据
        type: this.type,
        brithday: {
          'brithday[date]': this.date,
          'brithday[hour]': this.hour,
          'brithday[type]': this.type,
          // "brithday[leap_month]":this.leap_month,
        },
        newBirthday: {
          brithday: {
            date: this.date,
            hour: this.hour,
            type: this.type,
          },
        },
        date: this.date,
        hour: this.hour || 0,
        year: this.showYear,
        month: this.coverTo(Number(this.showMonth)),
        day: this.coverTo(this.selectValue[2] + 1),
      }
      if (this.type == 'lunar') {
        data.brithday['brithday[leap_month]'] = this.leap_month
        data.newBirthday.brithday.leap_month = this.leap_month
        data.leap_month = this.leap_month
      }
      this.$emit('confirm', data)
      this.nextFinally = true
    },
    // 进来获取公历的1990-02-10 10,初始化
    getTime() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.years = []
      this.days = []
      this.months = []
      for (let i = this.oldYear; i <= date.getFullYear(); i++) {
        if (this.isActive) {
          this.years.push(i)
        } else {
          this.years.push(conversion.toChinaYear(i))
        }
      }
      if (this.isActive) {
        this.getsolarMonthDays(this.sureYear, this.sureMonth, this.selectValue)
      } else {
        this.getlunarMonthDays(this.sureYear, this.sureMonth, this.selectValue)
      }
      this.lunarHour = lunarHour.lunarHour
    },
    bindChange: function (e) {
      const val = e.detail.value
      let year = val[0] + this.oldYear,
        month = val[1] + 1,
        day = val[2] + 1
      this.days = []
      this.months = []
      this.selectValue = e.detail.value
      this.nextFinally = false
      // 公历返回每个月天数
      if (this.isActive) {
        this.getsolarMonthDays(year, month, val)
      } else {
        this.getlunarMonthDays(year, month, val)
      }
    },
    // D=>DD,M=>MM,日，月转换 1=>01
    coverTo(num) {
      return num < 10 ? '0' + num : num
    },
    // 获取公历的月份和天数
    getsolarMonthDays(year, month, val) {
      console.log(val, '下标')
      for (let i = 1; i <= 12; i++) {
        this.months.push(i + '月')
      }
      for (let i = 1; i <= conversion.solarDays(year, month); i++) {
        this.days.push(i + '日')
      }
      this.leap_month = 0
      this.date = `${val[0] + this.oldYear}-${this.coverTo(val[1] + 1)}-${this.coverTo(val[2] + 1)}`
      this.hour = val[3] - 1
      let showHour = this.isHourShow ? `${val[3] != 0 ? val[3] - 1 + '时' : ''}` : ''
      this.showData = `公历 ${val[0] + this.oldYear}年${this.coverTo(val[1] + 1)}月${this.coverTo(
        val[2] + 1
      )}日 ${showHour}`
      this.showYear = `${val[0] + this.oldYear}`
      this.showMonth = `${val[1] + 1}`
      setTimeout(e => {
        this.nextFinally = true
      }, 200)
    },
    // 获取农历的月份和天数
    getlunarMonthDays(year, month, e) {
      console.log(e, '下标')
      let leap_month = conversion.leapMonth(year)
      // 返回农历 闰月没有就返回0
      for (let i = 1; i <= 12; i++) {
        this.months.push(conversion.toChinaMonth(i))
        if (i == leap_month) {
          this.months.push('闰' + conversion.toChinaMonth(i))
        }
      }
      // 农历返回天数
      // **leapMonth 返回闰月 conversion.leapMonth(year)
      // **monthDays 返回非闰月的天数
      // **leapDays 返回闰月的天数
      if (
        conversion.leapMonth(year) != 0 &&
        (conversion.leapMonth(year) == month || month - 1 == conversion.leapMonth(year))
      ) {
        for (let i = 1; i <= conversion.leapDays(year, conversion.leapMonth(year)); i++) {
          this.days.push(conversion.toChinaDay(i))
        }
      } else {
        let lunarMonth = ''
        if (conversion.leapMonth(year)) {
          lunarMonth = month < conversion.leapMonth(year) ? month : month - 1
        } else {
          lunarMonth = month
        }
        for (let i = 1; i <= conversion.monthDays(year, lunarMonth); i++) {
          this.days.push(conversion.toChinaDay(i))
        }
      }
      if (e) {
        const val = e
        let year = val[0] + this.oldYear,
          month = val[1],
          day = val[2],
          hour = val[3] ? val[3] : 0,
          m = '',
          d = '',
          h = ''
        m = this.months[month]
        d = this.days[day]
        h = this.lunarHour[hour].value + '时'
        this.leap_month = month == leap_month && leap_month != 0 ? 1 : 0
        let lunarToMonth = this.coverTo(
          leap_month != 0 ? (month + 1 <= leap_month ? month + 1 : month) : month + 1
        )
        console.log(lunarToMonth, '获取当前月份')
        this.date = `${year}-${lunarToMonth}-${this.coverTo(day + 1)}`
        this.hour = hour - 1
        let showHour = this.isHourShow ? `${h}` : ''
        this.showData = `农历 ${conversion.toChinaYear(year)}年${m}${d} ${showHour == '24时' ? '' : showHour}`
        this.showYear = year
        this.showMonth = lunarToMonth
      }
      setTimeout(e => {
        this.nextFinally = true
      }, 150)
    },
    // 切换公历<=>农历 回显以及切换 this.$refs.yourname.switchBtb(type,data),type:"lunar" or "solar", data:{date:"1992-02-10",hour:3,leap_month:"0",type:"lunar"}
    switchBtn(type, data) {
      console.log(type, data, '切换')
      if (data) {
        // console.log(data,"回显")
        // 回显
        let year = this.$utils.formatDate(data.date).YYYY
        let leapMonth = type == 'solar' ? 0 : conversion.leapMonth(year),
          month = this.$utils.formatDate(data.date).MM,
          day = this.$utils.formatDate(data.date).D,
          y = year - this.oldYear,
          // m = leapMonth != 0 ? (Number(month)-1 <= leapMonth ? Number(month) - 1 : Number(month)) : Number(month) - 1,
          m =
            data.leap_month == 1
              ? Number(month)
              : leapMonth != 0
              ? Number(month) <= leapMonth
                ? Number(month) - 1
                : Number(month)
              : Number(month) - 1,
          d = day - 1,
          h = Number(data.hour) + 1
        // console.log(leapMonth,"是否闰月",m)
        this.leap_month = data.leap_month ? 1 : 0
        this.type = data.type
        this.sureYear = year // 默认弹出显示年份
        this.sureMonth = month // 默认弹出显示月份
        // console.log(m,"回显月份")
        this.selectValue = [y, m, d, h] // 默认弹出选择的状态1990-06-10 10
        // console.log(m,Number(month),leapMonth)
        // console.log(this.sureYear,this.sureMonth,this.selectValue,"回显")
      } else {
        // 农历公历互相联动切换
        if (this.type == type) {
          return false
        }
        if (type == 'lunar') {
          // 公历切换为农历
          let solarYear = this.selectValue[0] + this.oldYear // 公历年份
          let leapMonth = conversion.leapMonth(solarYear)
          let solarMonth = this.selectValue[1] + 1, // 公历年月份
            solarDay = this.selectValue[2] + 1, // 公历年日份
            hour = this.selectValue[3]
          let lunarDate = conversion.solar2lunar(solarYear, solarMonth, solarDay)
          this.sureYear = lunarDate.lYear // 默认弹出显示年份
          this.sureMonth = lunarDate.lMonth // 默认弹出显示月份
          this.leap_month = leapMonth != 0 ? 1 : 0
          let y = lunarDate.lYear - this.oldYear,
            m =
              this.leap_month == 0
                ? lunarDate.lMonth - 1
                : this.selectValue[1] < leapMonth
                ? lunarDate.lMonth - 1
                : lunarDate.lMonth,
            d = lunarDate.lDay - 1
          console.log(this.leap_month, '显示', leapMonth, lunarDate.lMonth, this.selectValue[1])
          this.selectValue = [y, m, d, hour] // 默认弹出选择的状态1990-06-10 10
          // console.log(this.sureYear,this.sureMonth,this.selectValue,"回显农历")
        } else {
          // 农历切换为公历
          let lunarYear = this.selectValue[0] + this.oldYear // 农历年份
          let leapMonth = conversion.leapMonth(lunarYear) // 一年中的几月份是闰月
          let lunarMonth =
              leapMonth == 0
                ? this.selectValue[1] + 1
                : this.selectValue[1] + 1 <= leapMonth
                ? this.selectValue[1] + 1
                : this.selectValue[1], // 农历年月份
            lunarDay = this.selectValue[2] + 1, // 农历年日份
            hour = this.selectValue[3]
          // console.log(this.selectValue[1],"月份index")
          let lunarDate = conversion.lunar2solar(
            lunarYear,
            lunarMonth,
            lunarDay,
            leapMonth == this.selectValue[1] ? true : false
          )
          // console.log(lunarDate,"回显公历全部数据")
          this.sureYear = lunarDate.cYear // 默认弹出显示年份
          this.sureMonth = lunarDate.cMonth // 默认弹出显示月份
          this.leap_month = leapMonth != 0 ? 1 : 0
          let y = lunarDate.cYear - this.oldYear,
            m = lunarDate.cMonth - 1,
            d = lunarDate.cDay - 1
          this.selectValue = [y, m, d, hour] // 默认弹出选择的状态1990-06-10 10
          // console.log(this.sureYear,this.sureMonth,this.selectValue,"回显公历")
        }
      }
      this.isActive = type == 'solar' ? true : false
      this.type = type
      this.getTime()
    },
  },
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 750rpx;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999999;
}
.u-mask-zoom {
  transform: scale(1, 1);
}
.calendar {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    // height: 100%;
    background-color: #fff;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    animation: switchOpen 500ms linear;
    @keyframes switchOpen {
      from {
        top: 100%;
      }
      to {
        top: 0%;
      }
    }
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 100rpx;
      position: relative;
      border-bottom: 2rpx solid #e6e6e6;
      background-color: #ffffff;
      border-top-left-radius: 24rpx;
      border-top-right-radius: 24rpx;
      /* #ifdef MP-WEIXIN */
      margin-top: 0;
      /* #endif */
      .switch {
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        color: #a6a6a6;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .left,
        .right {
          font-size: 32rpx;
          display: inline-block;
          width: 100rpx;
          text-align: center;
        }
        .bg {
          background-color: $main-color;
          border-radius: 30px;
          height: 3px;
          width: 40rpx;
          position: absolute;
          // right: 0;
          bottom: 0px;
          z-index: 0;
        }
        .active {
          color: $main-color;
        }
        .lunar {
          left: 125rpx;
          animation: switchsolar 500ms;
        }
        @keyframes switchsolar {
          0% {
            left: 25rpx;
          }
          100% {
            left: 125rpx;
          }
        }
        .solar {
          left: 25rpx;
          animation: switchlunar 500ms;
        }
        @keyframes switchlunar {
          0% {
            left: 125rpx;
          }
          100% {
            left: 25rpx;
          }
        }
      }
      .ignore-year {
        position: absolute;
        right: 30rpx;
      }
    }
    picker-view {
      width: 100%;
      height: 500rpx;
      margin: 40rpx auto;
      ::v-deep.item {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333333;
        font-size: 32rpx;
        font-weight: bold;
      }
      .uni-picker-view-wrapper {
        uni-picker-view-column {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333333;
          font-size: 32rpx;
          font-weight: bold;
          .uni-picker-view-group {
            .uni-picker-view-content {
              text-align: center;
              line-height: 110rpx;
              .item {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #333333;
                font-size: 32rpx;
                font-weight: bold;
              }
            }
          }
        }
      }
      ::v-deep .uni-picker-view-indicator {
        // text-align: center;
        // line-height: 110rpx;
      }
    }
    .bottom {
      height: 100rpx;
      width: 100%;
      display: flex;
      background-color: #f7f7f7;
      view {
        width: 50%;
        line-height: 110rpx;
        text-align: center;
        font-size: 32rpx;
      }
      .left {
        color: #a6a6a6;
        border-right: 1px solid transparent;
      }
      .right {
        color: $main-color;
        border-left: 1px solid #e6e6e6;
      }
    }
  }
}
</style>
