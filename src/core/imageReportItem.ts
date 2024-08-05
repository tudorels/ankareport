import { IImageReportItem as LayoutReportItem } from "./layout";
import ImageReportItemProperties from "./imageReportItemProperties";
import ReportItem, { ReportItemOptions } from "./reportItem";
import { MultipleStyles } from "./utils/style.utils";

export default class ImageReportItem extends ReportItem {
  public readonly elementImg = document.createElement("img");

  public readonly properties = new ImageReportItemProperties();

  constructor(options: ReportItemOptions) {
    super();

    this.element.appendChild(this.elementImg);

    if (options.appendTo) {
      options.appendTo.appendChild(this.element);
    }

    this._styles = new MultipleStyles(...options.parentStyles, this.properties);

    if (options.defaultProperties) {
      super.loadLayout(options.defaultProperties);
    }

    super.init();
  }

  refresh() {
    super.refresh();

    if (this.elementImg) {
      this.elementImg.style.width = `${this.properties.width}px`;
      this.elementImg.style.height = `${this.properties.height}px`;
      this.elementImg.src = this.properties.source || "";
    }
  }

  applyLayout(layout: Partial<LayoutReportItem>) {
    this.properties.source = layout.source || "";
    super.applyLayout(layout);
  }

  toJSON(): LayoutReportItem {
    return {
      ...super.toJSON(),
      type: "image",
      source: this.properties.source,
    };
  }
}
