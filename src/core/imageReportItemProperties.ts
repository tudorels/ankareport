import { Property } from "../components/propertyGrid/property";
import ReportItemProperties from "./reportItemProperties";

export default class ImageReportItemProperties extends ReportItemProperties {
  private _source = "";

  get source() {
    return this._source;
  }

  set source(value: string) {
    const oldValue = this.source;
    this._source = value;
    this.emitOnChange("source", value, oldValue);
  }

  getPropertyDefinitions(): Property[] {
    return [
      { field: "source", label: "Source", type: "string" }, // TODO: type: image
      ...super.getPropertyDefinitions(),
    ];
  }
}
