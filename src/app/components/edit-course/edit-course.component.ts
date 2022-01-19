import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  id!: any;
  course: any;
  updateForm!: FormGroup;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      isCompleted: ['', Validators.required],
      link: ['', Validators.required],
      platform: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.actRoute.params.subscribe((params) => {
      this.id = params.id;
      this.courseService.getCourseById(this.id).subscribe((res) => {
        this.course = res;
        this.updateForm.get('name')?.setValue(this.course.name);
        this.updateForm.get('isCompleted')?.setValue(this.course.isCompleted);
        this.updateForm.get('link')?.setValue(this.course.link);
        this.updateForm.get('platform')?.setValue(this.course.platform);
        this.updateForm.get('description')?.setValue(this.course.description);
      });
    });
  }

  updateCourse() {
    const { value } = this.updateForm;
    console.log('value', value);
    this.courseService.updateCourse(this.id, value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/list-course']);
    });
  }
}
