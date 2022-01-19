import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: any;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.spinner.show();
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        this.spinner.hide();
        console.log(this.courses);
      },
      (error) => {
        this.spinner.hide();
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/login']);
          }
        }
        console.log(error.error.message);
      }
    );
  }

  editCourse(id: any) {
    this.router.navigate([`/edit-course/${id}`]);
  }

  deleteCourse(id: any) {
    this.courseService.deleteCourse(id).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.fetchCourses();
      },
      (error) => {
        console.log(error);
        this.toastr.success(error.error.message);
        this.spinner.hide();
      }
    );
  }
}
