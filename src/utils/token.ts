export function clearStorage() {
  localStorage.clear();
}

const AccessTokenKey: string = "AccessToken";

export function getAccessToken() {
  return localStorage.getItem(AccessTokenKey);
}

export function setAccessToken(token: string) {
  return localStorage.setItem(AccessTokenKey, token);
}

const UidKey: string = "Uid";

export function getUid() {
  return localStorage.getItem(UidKey);
}

export function setUid(uid: string) {
  return localStorage.setItem(UidKey, uid);
}

const TerminalIdKey: string = "TerminalId";

export function getTerminalId() {
  return localStorage.getItem(TerminalIdKey);
}

export function setTerminalId(tid: string) {
  return localStorage.setItem(TerminalIdKey, tid);
}
