import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../user.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LoadingService } from '../../ui/loading.service';
import { SnackbarService } from '../../ui/snackbar.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns = ['avatar', 'name', 'email', 'actions'];

  q = '';
  page = 1;
  pageSize = 3;   
  totalUsers = 0;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private loadingSvc: LoadingService,
    private snack: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.loadingSvc.show();

    this.api.list(this.page, this.pageSize).subscribe({
      next: (res) => {
        this.users = res.data || [];
        this.dataSource.data = this.users;

        this.totalUsers = res.total; 
        this.paginator.length = res.total;
        this.paginator.pageSize = this.pageSize;

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: () => this.snack.error('Failed to load users'),
      complete: () => {
        this.loading = false;
        this.loadingSvc.hide();
      },
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.q.trim().toLowerCase();
  }

  view(user: User): void {
    this.router.navigateByUrl('/users/' + user.id);
  }

  openCreate(): void {
    this.dialog.open(UserFormDialogComponent).afterClosed().subscribe((ok) => {
      if (ok) this.fetch();
    });
  }

  openEdit(user: User): void {
    this.dialog.open(UserFormDialogComponent, { data: user }).afterClosed().subscribe((ok) => {
      if (ok) this.fetch();
    });
  }

  del(user: User): void {
    if (!confirm('Delete this user?')) return;

    this.api.delete(user.id!).subscribe({
      next: () => {
        this.snack.success('User deleted successfully');
        this.fetch();
      },
      error: () => this.snack.error('Failed to delete user'),
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1; 
    this.pageSize = event.pageSize;
    this.fetch();
  }
}
