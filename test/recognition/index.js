import expect from 'expect'
import moment from 'moment'
import { tryParseMeetCmd } from '../../src'

const year = '2015';
const month = '12';
const day = '6';

const sixDec = `${year}-${month}-${day}`;
const currentWeekMoment = moment(`${sixDec}`, "YYYY-MM-DD").startOf('week').isoWeekday(1);

describe('meet date span recognition', () => {
  it('в воскресенье вечером', () => {
  	const {dateFrom, dateTo} = tryParseMeetCmd('в воскресенье вечером', currentWeekMoment)
  	expect(dateFrom).toEqual(moment(`${sixDec} 18:00`, "YYYY-MM-DD HH:mm"))
  	expect(dateTo).toEqual(moment(`${sixDec} 23:59`, "YYYY-MM-DD HH:mm"))
  })

  it('в воскресенье с 18 до 21', () => {
  	const {dateFrom, dateTo} = tryParseMeetCmd('в воскресенье с 18 до 21', currentWeekMoment)
  	expect(dateFrom).toEqual(moment(`${sixDec} 18:00`, "YYYY-MM-DD HH:mm"))
  	expect(dateTo).toEqual(moment(`${sixDec} 21:00`, "YYYY-MM-DD HH:mm"))
  })

  it('6 декабря после 18', () => {
  	const {dateFrom, dateTo} = tryParseMeetCmd('6 декабря после 18', currentWeekMoment)
  	expect(dateFrom).toEqual(moment(`${sixDec} 18:00`, "YYYY-MM-DD HH:mm"))
  	expect(dateTo).toEqual(moment(`${sixDec} 23:59`, "YYYY-MM-DD HH:mm"))
  })

  it('во вторник с 18', () => {
  	const {dateFrom, dateTo} = tryParseMeetCmd('во вторник с 18', currentWeekMoment)
  	expect(dateFrom).toEqual(currentWeekMoment
  		.add(2, 'days')
  		.add(18, 'hours'))
  	expect(dateTo).toEqual(currentWeekMoment
  		.add(2, 'days')
  		.add(23, 'hours')
  		.add(59, 'minutes')
	)
  })
})
