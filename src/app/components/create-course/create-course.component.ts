import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  createForm!: FormGroup;

  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      isCompleted: ['', Validators.required],
      link: ['', Validators.required],
      platform: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {}

  addCourse() {
    const { value } = this.createForm;
    console.log('value', value);

    this.courseService.addCourse(value).subscribe(() => {
      this.router.navigate(['/list-course']);
    });
  }
}
