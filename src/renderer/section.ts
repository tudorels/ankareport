import ImageReportItem from "../core/imageReportItem";
import { ISection, IStyle, ITextReportItem } from "../core/layout";
import ReportItem from "../core/reportItem";
import StyleProperties from "../core/styleProperties";
import TextReportItem from "../core/textReportItem";

export default class Section {
  public readonly element = document.createElement("div");
  public readonly elementSections = document.createElement("div");
  private readonly reportItems: ReportItem[] = [];

  constructor(
    private readonly layout: ISection,
    private readonly data: any,
    private readonly defaultStyles: IStyle[],
  ) {
    this._init();
  }

  private _init() {
    this.element.classList.add("anka-section");

    this.element.style.height = this.layout.height + "px";
    this.element.style.position = "relative";

    const defaultStylesList: StyleProperties[] = [];
    this.defaultStyles.forEach((x) =>
      defaultStylesList.push(new StyleProperties(x)),
    );
    defaultStylesList.push(new StyleProperties(this.layout));

    this.layout.items?.forEach((layout) => {
      debugger;
      if (layout.type === "text") {
        const item = new TextReportItem({ parentStyles: defaultStylesList });
        item.loadLayout(layout);
        const textLayout = layout as ITextReportItem;
        if (textLayout.binding) {
          item.properties.text = this.data
            ? this.data[textLayout.binding]
            : "NULL";
        }
        this.element.appendChild(item.element);
        this.reportItems.push(item);
      } else if (layout.type === "image") {
        const item = new ImageReportItem({ parentStyles: defaultStylesList });
        item.loadLayout(layout);
        this.element.appendChild(item.element);
        this.reportItems.push(item);
      }
    });

    this.layout.sections?.forEach((sectionLayout) => {
      const subDataSource = this.data ? this.data[sectionLayout.binding] : {};

      subDataSource?.forEach((sectionDataSource: any) => {
        const section = new Section(sectionLayout, sectionDataSource, [
          ...this.defaultStyles,
          this.layout,
        ]);

        this.elementSections.appendChild(section.element);
        this.elementSections.appendChild(section.elementSections);
      });
    });
  }
}
