let env_ = process.env.PROJECT_REFERRAL_HOST_TO_BACKEND;
export const PROJECT_REFERRAL_HOST = (env_ === undefined) ? "localhost" : env_.slice(0) as string;
env_ = process.env.PROJECT_REFERRAL_PORT_TO_BACKEND;
export const PROJECT_REFERRAL_PORT = (env_ === undefined) ? "localhost" : env_.slice(0) as string;

env_ = process.env.PROJECT_REFERRAL_PROTOCOL_TO_BACKEND;
export const PROJECT_REFERRAL_PROTOCOL = (env_ === undefined) ? "loocalhost" : env_.slice(0) as string;
