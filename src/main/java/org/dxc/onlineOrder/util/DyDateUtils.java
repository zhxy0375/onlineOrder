package org.dxc.onlineOrder.util;


import org.apache.commons.lang3.time.DateUtils;
import org.apache.log4j.Logger;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期的一些公共工具类
 * User: ouyang
 * Date: 13-8-29
 * Time: 上午9:50
 */
public class DyDateUtils extends DateUtils {

    public static final Logger logger = Logger.getLogger(DyDateUtils.class);

    public static final String 今日 = "今日";
    public static final String 本周 = "本周";
    public static final String 本月 = "本月";
    public static final String 所有 = "所有";

    public static final String YYYYMMDD = "yyyyMMdd";

    /**
     * 缺省的日期显示格式： yyyy-MM-dd
     */
    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

    /**
     * 缺省的日期时间显示格式：yyyy-MM-dd HH:mm:ss
     */
    public static final String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    
    
    public static final String DEFAULT_DATETIME_FORMAT2 = "MMddHHmmss";

    /**
     * 一天开始时间尾数
     */
    public static final String BEGIN_TIME = " 00:00:00";

    /**
     * 一天结束时间尾数
     */
    public static final String END_TIME = " 23:59:59";


    /**
     * 从datetime格式的字符串获取date字符串
     * eg getDateStrFromDateTimeStr("2012-11-11 11:11:11")
     *    return "2012-11-11"
     * @param dateTimeStr
     * @return
     */
    public static String getDateStrFromDateTimeStr(String dateTimeStr){
        return dateTimeStr.substring(0,10);
    }

    /**
     * 获取日期的开始时间
     * eg: Date date =  getDateByString("2013-11-11","yyyy-MM-dd")
     *      getDateTimeBegin(date)
     * return   "2013-11-11 00:00:00"
     * @param date 日期
     * @return
     */
    public static Date getDateTimeBegin(Date date) throws ParseException {
    	if(date == null){
    		return null;
    	}
        String dateStr = getDateString(date,DEFAULT_DATE_FORMAT)+ BEGIN_TIME;
        return getDateByString(dateStr,DEFAULT_DATETIME_FORMAT);
    }

    /**
     * 获取日期的结束时间
     * @param date  日期
     * @return
     */
    public static Date getDateTimeEnd(Date date) throws ParseException {
    	if(date == null){
    		return null;
    	}
        String dateStr = getDateString(date, DEFAULT_DATE_FORMAT)+ END_TIME;
        return getDateByString(dateStr,DEFAULT_DATETIME_FORMAT);
    }


    /**
     * 获取今天的开始时间
     * @return
     */
    public static Date getCurrentDayDateTimeBegin() throws ParseException {
        return getDateTimeBegin(new Date());
    }

    /**
     * 获取今天的结束时间
     * @return
     */
    public static Date getCurrentDayDateTimeEnd() throws ParseException {
        return getDateTimeEnd(new Date());
    }

    /**
     * 获取本周的开始时间
     * @return
     */
    public static Date getCurrentWeekDateTimeBegin() throws ParseException{
        Calendar calendar = Calendar.getInstance();
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        if(dayOfWeek == Calendar.SUNDAY){
            calendar.add(Calendar.DAY_OF_MONTH,-6);
        }else{
            calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
        }
        return  getDateTimeBegin(calendar.getTime());
    }
    
    public static Date getCurrentWeekDateTimeBegin(Date date) throws ParseException{
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        if(dayOfWeek == Calendar.SUNDAY){
            calendar.add(Calendar.DAY_OF_MONTH,-6);
        }else{
            calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
        }
        return  getDateTimeBegin(calendar.getTime());
    }

    /**
     * 获取本周的结束时间
     * @return
     */
    public static Date getCurrentWeekDateTimeEnd() throws ParseException{
        Calendar calendar = Calendar.getInstance();
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        if(dayOfWeek > Calendar.SUNDAY){
            calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
            calendar.add(Calendar.DAY_OF_MONTH,6);
        }
        return  getDateTimeEnd(calendar.getTime());
    }
    
    public static Date getCurrentWeekDateTimeEnd(Date date) throws ParseException{
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        if(dayOfWeek > Calendar.SUNDAY){
            calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
            calendar.add(Calendar.DAY_OF_MONTH,6);
        }
        return  getDateTimeEnd(calendar.getTime());
    }

    /**
     * 获取上周的开始时间
     * @return
     */
    public static Date getLastWeekDateTimeBegin() throws ParseException{
        return addDays(getCurrentWeekDateTimeBegin(), -7);
    }

    /**
     * 获取上周的结束时间
     * @return
     */
    public static Date getLastWeekDateTimeEnd() throws ParseException{
        return addDays(getCurrentWeekDateTimeEnd(), -7);
    }


    /**
     * 获取本月的开始时间
     * @return
     */
    public static Date getCurrentMonthDateTimeBegin() throws ParseException {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH,1);
        return getDateTimeBegin(calendar.getTime());
    }

    /**
     * 获取本月的结束时间
     * @return
     */
    public static Date getCurrentMonthDateTimeEnd() throws ParseException {
        Calendar calendar = Calendar.getInstance();
        //将日期设置为下一月第一天
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1, 1);
        //减去1天，得到的即本月的最后一天
        calendar.add(Calendar.DATE, -1);
        return getDateTimeEnd(calendar.getTime());
    }

    /**
     * 得到日期的字符串
     * @param date  java.util.Date
     * @param format  eg.yyyy-mm-dd
     * @return
     */
    public static String getDateString(Date date,String format){
        if(date == null){
            return null;
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.format(date);
    }

    /**
     * 得到日期的字符串
     * @param date  java.util.Date
     * @return  "yyyy-MM-dd";
     */
    public static String getDateString(Date date){
        if(date == null){
            return null;
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat(DEFAULT_DATE_FORMAT);
        return dateFormat.format(date);
    }

    /**
     * 获得日期时间字符串
     * @param date  java.util.Date
     * @return   "yyyy-MM-dd HH:mm:ss";
     */
    public static String getDateTimeString(Date date){
        if(date == null){
            return null;
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat(DEFAULT_DATETIME_FORMAT);
        return dateFormat.format(date);
    }

    /**
     * 根据日期字符串获取日期对象
     * @param dateStr  eg."2013-11-12 12:11:22"
     * @param format   eg."yyyy-MM-dd HH:mm:ss"
     * @return
     * @throws ParseException
     */
    public static Date getDateByString(String dateStr,String format) throws ParseException {
        if((dateStr == null) || "".equals(dateStr.trim())){
            return null;
        }
        return new SimpleDateFormat(format).parse(dateStr);
    }

    /**
     * 字符串日期增加天数
     * @param dateStr  eg."2013-11-12 12:11:22"
     * @param format   eg."yyyy-MM-dd HH:mm:ss"
     * @param amount   要增加的天数
     * @return
     * @throws ParseException
     */
    public static String addDays(String dateStr,String format,int amount) throws ParseException{
    	return getDateString(addDays(getDateByString(dateStr, format),amount), format);
    }


    /**
     * 录音时长转化为秒 专为电话录音时间长
     * @param keepTime
     * @return
     */
    public static String formatRecordTime(Integer keepTime) {
		if ((keepTime == null) || (keepTime < 0)) {
			return "00:00";
		}
		int min = keepTime / 60;
		int se = keepTime - (min * 60);
		return DyStringUtils.leftPad(String.valueOf(min), 2, "0") + ":"
				+ DyStringUtils.leftPad(String.valueOf(se), 2, "0");
	}


    /**
     * 检查字符串是否符合指定格式
     * @param dateString 日期字符串
     * @param pattern 日期格式
     * @return
     */
    public static boolean validateDate(String dateString, String pattern){
        if( DyStringUtils.isEmpty(dateString)) {
            return false;
        }

        if( DyStringUtils.isEmpty(pattern)) {
            return false;
        }

        try {
            new SimpleDateFormat(pattern).parse(dateString);
        } catch (ParseException e) {
            return false;
        }

        return true;
    }


    /**
     * 比较两个日期  @return 1  one > two
     *              @return 0  one = two
     *              @return -1 one < two
     * @param one  date
     * @param two  date
     */
    public static int compareDate(Date one, Date two) {
        if(getDateString(one).equals(getDateString(two))){
            return 0;
        }
        if(one.getTime() > two.getTime()){
            return 1;
        }else{
            return -1;
        }
    }


    //#####################################################
    //#####################################################
    //#######下面来自dy-commons-fy Dates包 统一工具包的使用
    //#####################################################
    //#####################################################


    /**
     * 一天的总毫秒数
     */
    public static final long ONE_DAY_MILLISECONDS = 86400000;

    /**
     * 一分钟的总毫秒数
     */
    public static final long ONE_MINUTE_MILLISECONDS = 6000;


    /**
     * 比较两个时间相差的天数
     * @param date1
     * @param date2
     * @return
     */
    public static int dateDiff(Date date1, Date date2) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(date1);
        String time2 = sdf.format(date2);
        try {
            date1 = sdf.parse(time);
            date2 = sdf.parse(time2);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        long d1 = date1.getTime();
        long d2 = date2.getTime();
        long dif = d1 > d2 ? d1 - d2 : d2 - d1;
        return Integer.parseInt(String.valueOf(dif / ONE_DAY_MILLISECONDS));
    }

    /**
     * 格式化标准时间成Date
     * @param dateString 标准时间
     * @param pattern 时间格式类型 如"yyyy-MM-dd HH:mm:ss"
     * @return
     * @throws Exception
     */
    public static Date makeDate(String dateString, String pattern) throws Exception {
        if(DyStringUtils.isEmpty(dateString))
            return null;
        return new SimpleDateFormat(DyStringUtils.defaultStr(pattern, DEFAULT_DATETIME_FORMAT)).parse(dateString);
    }

    /**
     * 得到系统当前时间
     * @return 当前日期时间
     */
    public static Date getNow() {
        return Calendar.getInstance().getTime();
    }

    /**
     * 得到用缺省方式得到格式化后的系统时间字符串
     * 默认格式：yyyy-MM-dd HH:mm:ss
     * @return 当前日期及时间
     */
    public static String getDateTime() {
        return getDateTime(DEFAULT_DATETIME_FORMAT);
    }

    /**
     * 得到指定格式的系统时间字符串
     * @param pattern 显示格式
     * @return 格式化后的系统时间字符串
     */
    public static String getDateTime(String pattern) {
        Date datetime = Calendar.getInstance().getTime();
        if(DyStringUtils.isEmpty(pattern))
            pattern = DEFAULT_DATETIME_FORMAT;

        return getDateTime(datetime, pattern);
    }

    /**
     * 将制定日期格式化成指定格式
     * @param date 需要进行格式化的日期
     * @param pattern 日期格式
     * @return 格式化后的日期时间字符串
     */
    public static String getDateTime(Date date, String pattern) {
        if (DyStringUtils.isEmpty(pattern)) {
            pattern = DEFAULT_DATETIME_FORMAT;
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
        return dateFormat.format(date);
    }

    /**
     * 得到当前系统时间的年份
     * @return 当前年份
     */
    public static int getCurrentYear() {
        return Calendar.getInstance().get(Calendar.YEAR);
    }

    /**
     * 得到当前系统时间的月份
     * @return 当前月份
     */
    public static int getCurrentMonth() {
        return Calendar.getInstance().get(Calendar.MONTH) + 1;
    }

    /**
     * 得到当前当前系统时间的日
     * @return 当前日
     */
    public static int getCurrentDay() {
        return Calendar.getInstance().get(Calendar.DATE);
    }

    /**
     * 取得当前日期以后若干天的日期。
     * @param days 变更的天数
     * @return
     */
    public static Date getAfterDays(int days) {
        return add(getNow(), days, Calendar.DATE);
    }

    /**
     * 取Date以后的若干分钟
     * @param date
     * @param mintues
     * @return
     */
    public static Date addMinutes(Date date, int mintues) {
        return org.apache.commons.lang3.time.DateUtils.addMinutes(date, mintues);
    }

    /**
     * 取当前时间以后的若干分钟
     * @param mintues
     * @return
     */
    public static Date addMinutes(int mintues) {
        return addMinutes(new Date(), mintues);
    }

    /**
     * 取得当前日期之前若干天的日期。
     * @param days 变更的天数
     * @return
     */
    public static Date getBeforeDays(int days) {
        return add(getNow(), beforeDay(days), Calendar.DATE);
    }

    /**
     * 取得指定日期以后若干天的日期。
     * @param date 基准日期
     * @param days 变更的天数
     * @return
     */
    public static Date getAfterDays(Date date, int days) {
        return add(date, days, Calendar.DATE);
    }

    /**
     * 取得指定日期之前若干天的日期。
     * @param date 基准日期
     * @param days 变更的天数
     * @return
     */
    public static Date getBeforeDays(Date date, int days) {
        return add(date, beforeDay(days), Calendar.DATE);
    }

    private static int beforeDay(int days){
        return 0 - days;
    }

    /**
     * 取得当前日期以后某月的日期。如果要得到以前月份的日期，参数用负数。
     * @param months 增加的月份数
     * @return 增加以后的日期
     */
    public static Date addMonths(int months) {
        return add(getNow(), months, Calendar.MONTH);
    }

    /**
     * 取得指定日期以后某月的日期。如果要得到以前月份的日期，参数用负数。
     * 注意，可能不是同一日子，例如2003-1-31加上一个月是2003-2-28
     * @param date 基准日期
     * @param months 增加的月份数

     * @return 增加以后的日期
     */
    public static Date addMonths(Date date, int months) {
        return add(date, months, Calendar.MONTH);
    }

    /**
     * 内部方法。为指定日期增加相应的天数或月数
     * @param date 基准日期
     * @param amount 增加的数量
     * @param field 增加的单位，年，月或者日
     * @return 增加以后的日期
     */
    private static Date add(Date date, int amount, int field) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(field, amount);
        return calendar.getTime();
    }

    /**
     * 计算两个日期相差天数。
     * 用第一个日期减去第二个。如果前一个日期小于后一个日期，则返回负数
     * @param one 第一个日期数，作为基准
     * @param two 第二个日期数，作为比较
     * @return 两个日期相差天数
     */
    public static long diffDays(Date one, Date two) {
        return (one.getTime() - two.getTime()) / ONE_DAY_MILLISECONDS;
    }

    /**
     * 计算两个日期相差月份数
     * 如果前一个日期小于后一个日期，则返回负数
     * @param one 第一个日期数，作为基准
     * @param two 第二个日期数，作为比较
     * @return 两个日期相差月份数
     */
    public static int diffMonths(Date one, Date two) {
        Calendar calendar = Calendar.getInstance();
        //得到第一个日期的年分和月份数
        calendar.setTime(one);
        int yearOne = calendar.get(Calendar.YEAR);
        int monthOne = calendar.get(Calendar.MONDAY);
        //得到第二个日期的年份和月份
        calendar.setTime(two);
        int yearTwo = calendar.get(Calendar.YEAR);
        int monthTwo = calendar.get(Calendar.MONDAY);
        return (yearOne - yearTwo) * 12 + (monthOne - monthTwo);
    }

    /**
     * 将一个字符串用给定的格式转换为日期类型
     * 注意：如果返回null，则表示解析失败
     * @param datestr 需要解析的日期字符串
     * @param pattern 日期字符串的格式，默认为“yyyy-MM-dd”的形式
     * @return 解析后的日期
     */
    public static Date parse(String datestr, String pattern) {
        Date date = null;
        if (null == pattern || "".equals(pattern)) {
            pattern = DEFAULT_DATE_FORMAT;
        }
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
            date = dateFormat.parse(datestr);
        }
        catch (ParseException e) {
        }
        return date;
    }

    /**
     * 返回本月的最后一天
     * @return 本月最后一天的日期
     */
    public static Date getMonthLastDay() {
        return getMonthLastDay(getNow());
    }

    /**
     * 返回给定日期中的月份中的最后一天
     * @param date 基准日期
     * @return 该月最后一天的日期
     */
    public static Date getMonthLastDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        //将日期设置为下一月第一天
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1, 1);
        //减去1天，得到的即本月的最后一天
        calendar.add(Calendar.DATE, -1);
        return calendar.getTime();
    }

    /**
     * 获取当天时间字符串  yyyy-MM-dd
     * @return yyyy-MM-dd
     */
    public static String getDate(){
        return getDateTime(DEFAULT_DATE_FORMAT);
    }

    /**
     * 获取当天起始时间字符串 yyyy-MM-dd
     * @return yyyy-MM-dd
     */
    public static String getDateBegin() {
        return getDate()+ " 00:00:00";
    }

    /**
     * 获取当天起始时间字符串 yyyy-MM-dd
     * @return yyyy-MM-dd
     */
    public static String getDatetimeBegin() {
        return getDateBegin() + " 00:00:00";
    }

    /**
     * 获取当天结束时间字符串 yyyy-MM-dd
     * @return yyyy-MM-dd
     */
    public static String getDateEnd() {
        return getDate() + " 23:59:59";
    }

    /**
     * 获取本周第一天
     * @return
     */
    public static Date getMonday(){
        Calendar calendar = Calendar.getInstance();
        int nowWeek = calendar.get(Calendar.DAY_OF_WEEK);
        if(nowWeek == Calendar.SUNDAY){
            calendar.add(Calendar.DAY_OF_MONTH,-6);
        }else{
            calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
        }
        return  calendar.getTime();
    }

    /**
     * 获取本周第一天
     * @return yyyy-MM-dd
     */
    public static String getMondayStr(){
        return  getDateTime(getMonday(),DEFAULT_DATE_FORMAT);
    }

    /**
     * 获取本周第一天
     * @return yyyy-MM-dd 00:00:00
     */
    public static String getMondayBeginStr(){
        return  getMondayStr()+" 00:00:00";
    }

    /**
     * 获取本周的周日
     * @return
     */
    public static Date getSunday(){
        Calendar calendar = Calendar.getInstance();
        int nowWeek = calendar.get(Calendar.DAY_OF_WEEK);
        if(nowWeek > Calendar.SUNDAY){
            calendar.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
            calendar.add(Calendar.DAY_OF_MONTH,6);
        }
        return  calendar.getTime();
    }

    /**
     * 获取本周周日
     * @return yyyy-mm-dd 23:59:59
     */
    public static  String getSundayStr(){
        return getDateTime(getSunday(),DEFAULT_DATE_FORMAT);
    }

    /**
     * 获取本周周日
     * @return yyyy-mm-dd 23:59:59
     */
    public static  String getSundayEndStr(){
        return getSundayStr()+" 23:59:59";
    }

    /**
     * 获取每月第一天
     * @return
     */
    public static Date  getMonthFirstDay(){
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH,1);
        return calendar.getTime();
    }

    /**
     * 获取每月第一天
     * @return yyyy-MM-dd
     */
    public static String  getMonthFirstDayStr(){
        return getDateTime(getMonthFirstDay(),DEFAULT_DATE_FORMAT);
    }

    /**
     * 获取每月第一天
     * @return yyyy-MM-dd 00:00:00
     */
    public static String  getMonthFirstDayBeginStr(){
        return getMonthFirstDayStr()+" 00:00:00";
    }

    /**
     * 获取每月最后一天 yyy-Mm-dd
     */
    public static String getMonthLastDayStr(){
        return getDateTime(getMonthLastDay(),DEFAULT_DATE_FORMAT);
    }

    /**
     * 获取每月最后一天 yyy-MM-dd 23:59:59
     */
    public static String getMonthLastDayEndStr(){
        return getMonthLastDayStr() + " 23:59:59";
    }

}
