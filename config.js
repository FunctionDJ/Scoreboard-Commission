/*
  IMPORTANT
  Properties who need explanation have a comment above them.
  All properties have their default / original value for production / streaming behind them in the same line as a comment.

  Feel free to play around with all values, you can restore everything by reverting the values to their defaults.
*/

// SBA's socket url
const socketURL = "ws://localhost:58341"

// id or name of the tab in SBA, lowercase
// this gets sent to SBA to request data and the scoreboard
// will only use data sent from a tab with this ID
const tabID = "test"

// don't wait for SBA and show everything as-is
// if false, the overlay won't show unless SBA sends data
// you probably only want to turn this on when you debug or work on the overlay
// IMPORTANT: you MUST set --initOpacity to 1 when you enable this, or the overlay won't show up at all
const skipInitFade = false

// time of the initial fade-in of the scoreboard in ms
// no effect if skipInitFade is true
const initFadeTime = 200 // 200

// time of fading all elements when updating in ms
const updateFadeTime = 200 // 200

// turn this off if you have --text-mode in the CSS changed to initial, turn on if it's uppercase (or the scoreboard won't update properly)
const uppercase = true // true