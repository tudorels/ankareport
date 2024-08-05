import ReportItem from "./reportItem";
import { ITextReportItem as LayoutTextReportItem } from "./layout";
import TextReportItemProperties from "./textReportItemProperties";
import { ITextReportItem as LayoutReportItem } from "./layout";
import { ReportItemOptions } from "./reportItem";
import { MultipleStyles } from "./utils/style.utils";

export default class TextReportItem extends ReportItem {
  public readonly properties = new TextReportItemProperties();

  constructor(options: ReportItemOptions) {
    super();

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

    this.element.innerText = this.properties.text;
  }

  applyLayout(layout: Partial<LayoutTextReportItem>) {
    this.properties.text = layout.text ?? "";
    this.properties.binding = layout.binding || "";
    super.applyLayout(layout);
  }

  toJSON(): LayoutReportItem {
    return {
      ...super.toJSON(),
      type: "text",
      text: this.properties.text,
      binding: this.properties.binding,
    };
  }
}
