import { TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  imports: [TitleCasePipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage implements OnInit {
  user: User | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.userService.getUserById(1).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os dados do usuário. Verifique sua internet ou tente novamente.';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
