import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-landing-noganador",
  templateUrl: "./landing-noganador.component.html",
  styleUrls: ["./landing-noganador.component.scss"],
})
export class LandingNoganadorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Swal.close();
  }
}
