import { checkCookieExists } from "./services/coockieSessionId"



document.addEventListener("DOMContentLoaded", () => {
  //   /* сделать прослушку для к "#submit-repeat". Через "fetch"
  //   запросить "/repeat_token" и все. Даьше заработает код python из
  //   "referral/views_more/views_account.py"
  //   */
  // sessionStorage.clear()
  // const cookie = checkCookieExists('user_token')
  // console.log(`Hallo world!: ${cookie}`)
  const cookie_arr = location.href.split('resp_cookie');
  const cookie_leng = cookie_arr.length;

  const cook_str = (cookie_arr[cookie_leng - 1] as string).slice(1,)
  console.log("ddddddddd" + cook_str)
})
