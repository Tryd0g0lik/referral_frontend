import { FetchParams, FetchMethod } from "@Interfaces";
// import { getCookie } from "./coockieSessionId";
import { PROJECT_REFERRAL_HOST, PROJECT_REFERRAL_PORT, PROJECT_REFERRAL_PROTOCOL } from "src/dotenv_";


const params: FetchParams = {
  method: FetchMethod.POST,
  mode: 'cors' as 'cors',
}

/**
 *
 * @param body_ Here is data for db + \ 'X-CSRFToken': getCookie('csrftoken') as string,
 * sessionId ` {
    sessionId: cookieId
  };`.
 * @param pathnameStr '/it/is/api/path/'
 * @returns JSON of boolesn
 */
export async function add(body_: string,
  pathnameStr = '/api/v1/referral/add/'
): Promise<object | boolean | string> {
  params['headers'] = {

    'Content-Type': 'application/json'
  };
  params['body'] = body_;
  const paramsCopy = {}
  Object.assign(paramsCopy, params);
  const urlStr = `${PROJECT_REFERRAL_PROTOCOL}://${PROJECT_REFERRAL_HOST}:${PROJECT_REFERRAL_PORT}`;

  const url = urlStr + pathnameStr;
  const answer = await fetch(url, paramsCopy);
  if (answer.ok) {
    const dataJson = answer.json();
    return dataJson
  }
  return false
}
