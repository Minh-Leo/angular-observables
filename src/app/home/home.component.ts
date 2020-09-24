import { Component, OnDestroy, OnInit } from "@angular/core";

import { interval, Observable, Observer, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe((next) => {
    //   console.log(next);
    // });

    // How make the same observable above in the true customized way
    // how use next error complete
    const customIntervalObs = new Observable((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count is more than 3"));
        }
        count++;
      }, 1000);
    });

    // How use operators in observable with pipe
    this.firstSubscription = customIntervalObs
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return `round  ${data}`;
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          console.log("Completed counting to 2");
        }
      );
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
