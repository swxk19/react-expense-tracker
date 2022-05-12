const date = new Date()
const n = date.toDateString() 
var t = date.toLocaleTimeString()
var timeShort = (t.length == 11 ? t.substring(0, 5) : t.substring(0, 4)) + " " + t.substring(t.length-2, t.length)
var dateShort = n.substring(4, n.length - 5)
export var dateTime = dateShort + " " + timeShort

