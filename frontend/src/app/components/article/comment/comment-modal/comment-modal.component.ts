import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SampleBtnComponent } from "../../../../shared/components/btns/sample-btn/sample-btn.component";
import { FormsModule } from "@angular/forms";
import { Article } from "../../../../shared/Types";

@Component({
  selector: "app-comment-modal",
  imports: [SampleBtnComponent, FormsModule],
  templateUrl: "./comment-modal.component.html",
  styleUrl: "./comment-modal.component.scss",
})
export class CommentModalComponent {
  @Input() displayStyle: string = "display: block";
  @Input() blog!: Article;
  @Output() onSubmit = new EventEmitter<{ id: string; comment: string }>();

  comment: string = "";

  submitComment() {
    if (this.comment.trim()) {
      this.onSubmit.emit({ id: this.blog._id!, comment: this.comment });
      // Clear the input field
      this.comment = "";
    }
  }
}
