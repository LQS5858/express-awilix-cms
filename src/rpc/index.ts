import { initMemberRPc } from './member'

export async function initRpc() {
  await Promise.allSettled([initMemberRPc()])
}
