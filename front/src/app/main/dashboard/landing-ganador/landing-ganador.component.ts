import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-landing-ganador",
  templateUrl: "./landing-ganador.component.html",
  styleUrls: ["./landing-ganador.component.scss"],
})
export class LandingGanadorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const valida = sessionStorage.getItem('participacionValida');

    if (!valida) {
      this.router.navigate(['/']);
      return;
    }

    sessionStorage.removeItem('participacionValida');

    Swal.close();
  }
}