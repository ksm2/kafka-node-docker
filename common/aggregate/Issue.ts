export default class Issue {
  readonly id: string;
  title: string;

  constructor(id: string, title: string) {
      this.title = title;
      this.id = id;
  }
}
