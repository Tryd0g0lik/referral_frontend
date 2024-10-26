import { add } from "./services/fetches";



document.addEventListener("DOMContentLoaded", () => {
  //   /* сделать прослушку для к "#submit-repeat". Через "fetch"
  //   запросить "/repeat_token" и все. Даьше заработает код python из
  //   "referral/views_more/views_account.py"
  //   */
  // sessionStorage.clear()
  // const cookie = checkCookieExists('user_token')
  // console.log(`Hallo world!: ${cookie}`) /token/get
  const cookie_arr = location.href.split('data_number=');
  if (cookie_arr.length <= 1) {
    return false
  }
  const dataNumberStr = (cookie_arr[1] as string)
  if (dataNumberStr && Number(dataNumberStr)) {
    const body_ = { data_number: Number(dataNumberStr) }
    add(
      JSON.stringify(body_), "/api/v1/token/get")
  }
  // setCookie('user_token, ')


  console.log("ddddddddd" + dataNumberStr)
})
