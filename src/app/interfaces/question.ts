
export interface Tag {
  name: string;
}

export interface Question {
  title: String
  tags: String[]
  link: String
  id: Number
  creation_date: Number
  score: Number,
  body: String
  comments_count: Number,
  answer_count: Number,
  is_answered: Boolean
}
