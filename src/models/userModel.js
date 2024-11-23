class AbstractModel {
  constructor() {
    if (this.constructor === AbstractModel) {
      throw new Error("AbstractModel no pueded ser instanciada directamente");
    }
  }
}
