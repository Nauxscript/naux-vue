class RefImpl {
  constructor(private _value: any) {

  }

  get value() {
    return this._value
  }
}
export const ref = (raw: any) => {
  return new RefImpl(raw)
}
