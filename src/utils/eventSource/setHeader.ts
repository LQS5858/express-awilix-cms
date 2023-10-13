import { IexpressResponse } from '../../types/app'
import { EventSourceHeaders } from '../../config'

export function setHeader(res: IexpressResponse) {
  const eventHeaderArr: string[] = Object.keys(EventSourceHeaders)

  eventHeaderArr.forEach((element: string) => {
    res.setHeader(element, EventSourceHeaders[element])
  })
}
