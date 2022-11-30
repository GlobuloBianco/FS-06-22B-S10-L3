import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { getPosts } from '../posts.service';

let arrayAggiornato: object[] = [];

@Component({
    template: `
    <div class="container mt-5">
      <div *ngFor="let post of posts">
        <div *ngIf="post.active"
        [ngClass]="{
      'bg-warning': post.type == 'news',
      'bg-info': post.type == 'education',
      'bg-dark': post.type == 'politic',
      'text-white': post.type == 'politic'
    }"
    class="card mb-4">
          <h5 class="card-header">Post</h5>
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">
              {{ post.body }}
            </p>
            <button type="button" class="btn btn-primary" (click)="disattiva(post.id)">Disattiva</button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [],
})

export class ActivePostsPage implements OnInit {
    posts!: Post[];
    constructor() {
        getPosts().then((posts) => {
            this.posts = posts.lista;
            console.log(this.posts);
            arrayAggiornato = this.posts;
        });
    }

    ngOnInit(): void {
        console.log(arrayAggiornato)
    }

    disattiva = (element: number) => {
        this.posts[element - 1].active = false;
        console.log(this.posts)
        //aggiornaJson
        fetch('http://localhost:3000/lista' + '/' + element, {
            method: 'PATCH',
            body: JSON.stringify({
                active: false,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
}
