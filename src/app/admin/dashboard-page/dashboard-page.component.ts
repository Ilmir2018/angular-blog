import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.less']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSbub: Subscription
  dSbub: Subscription
  searchStr = ''

  constructor(private postsService: PostsService, private alert: AlertService) { }

  ngOnInit(): void {
    this.pSbub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  ngOnDestroy() {
    if(this.pSbub) {
      this.pSbub.unsubscribe()
    }

    if(this.dSbub) {
      this.dSbub.unsubscribe()
    }
  }

  remove(id: string){
    this.dSbub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id);
      this.alert.danger('Пост был удалён!')
    })
  }

}
