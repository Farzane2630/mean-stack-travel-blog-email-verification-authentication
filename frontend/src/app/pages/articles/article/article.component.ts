import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../../../shared/services/article.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Article, User, Comment } from "../../../shared/Types";
import { DatePipe, NgOptimizedImage } from "@angular/common";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../auth/services/auth.service";
import { CommentComponent } from "../../../components/article/comment/comment.component";
import { CommentModalComponent } from "../../../components/article/comment/comment-modal/comment-modal.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: "app-article",
  imports: [
    NgOptimizedImage,
    DatePipe,
    CommentComponent,
    CommentModalComponent,
    LoadingComponent,
  ],
  templateUrl: "./article.component.html",
  // styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  blog!: Article;
  env: string = environment.IMAGE_BASE_URL;
  imageUrl: string = "";
  user!: User;
  commentModalStyle = "display: none";
  comment!: string;
  isSaved: boolean = false;
  isLiked: boolean = false;
  isSaving: boolean = false;
  isLiking: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params["_id"];
    this.isLoggedIn = this.authService.isUserLoggedIn();

    this.articleService.getArticle(id).subscribe((res: any) => {
      this.blog = res.post;
      this.imageUrl = `${this.env}/${res.post.image}`;
    });
    this.authService.getUser().subscribe((res: any) => {
      this.user = res.user;
      // set isSaved status
      if (res.user.savedPosts.find((post: Article) => post._id === id)) {
        this.isSaved = true;
      }
      if (res.user.likedPosts.find((post: Article) => post._id === id)) {
        this.isLiked = true;
      }
    });
  }

  updateLikes(id: string) {
    this.articleService.getArticle(id).subscribe((res: any) => {
      this.blog.likes = res.post.likes;
    });
  }

  // like btn handler
  likeBtnHandler(id: string | undefined) {
    this.isLiking = true;
    if (this.isLoggedIn) {
      this.articleService.likeArticle(id).subscribe({
        next: (res: any) => {
          id && this.updateLikes(id);
          this.isLiking = false;
        },
        error: (error: any) => {
          alert(error.error.message);
        },
      });
    } else {
     this.isLiking = false;
      alert("You are not loggedin. Please log in first.");
      this.router.navigate(["/auth/login"]);
    }
  }

  // save btn handler
  saveBtnHandler(id: string | undefined) {
    this.isSaving = true;
    if (this.isLoggedIn) {
      this.articleService.saveArticle(id).subscribe({
        next: (res: any) => {
          if (res.isSaved) {
            this.isSaved = true;
          } else {
            this.isSaved = false;
          }
          this.isSaving = false;
        },
        error: (error: any) => alert(error.error.message),
      });
    } else {
      this.isSaving = false;
      alert("You are not loggedin. Please log in first.");
      this.router.navigate(["/auth/login"]);
    }
  }

  showCommentModal(id: string | undefined) {
    this.commentModalStyle = "display: block";
  }

  submitComment({ id, comment }: { id: string; comment: string }) {
    let commentt: Comment = {
      likes: 0,
      dislikes: 0,
      replys: [],
      publishDate: new Date(),
      body: comment,
      writer: this.user.name || "",
    };
    console.log(commentt);

    this.articleService
      .addComment({ postId: id, comment: commentt })
      .subscribe((res) => console.log(res));
  }
}
