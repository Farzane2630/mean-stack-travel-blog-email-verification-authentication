import { NgOptimizedImage } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../auth/services/auth.service";
import { Article, Comment, User } from "../../../shared/Types";

@Component({
  selector: "app-comment",
  imports: [NgOptimizedImage],
  templateUrl: "./comment.component.html",
  styleUrl: "./comment.component.scss",
})
export class CommentComponent implements OnInit {
  env: string = environment.IMAGE_BASE_URL;
  @Input() comment!: Comment;
  @Input() blog!: Article;
  // user!: User;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.getUser().subscribe({
    //   next: (res: any) => (this.user = res.user),
    //   error: (error) => console.log(error.error.message),
    // });
  }
}
