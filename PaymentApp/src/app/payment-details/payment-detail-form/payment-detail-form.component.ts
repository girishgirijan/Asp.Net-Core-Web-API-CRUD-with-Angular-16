import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [],
})
export class PaymentDetailFormComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) {
      if (this.service.formData.paymentDetailId == 0) {
        this.insertRecord(form);
      } else {
        this.updateRecord(form);
      }
    } else {
      this.toastr.info('Please fill fields!', 'Payment Detail Register');
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe({
      next: (res) => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.success('Inserted successfully', 'Payment Detail Register');
      },
      error: (err) => {
        this.toastr.error(err, 'Payment Detail Register');
      },
    });
  }
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: (res) => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.success('Updated successfully', 'Payment Detail Register');
      },
      error: (err) => {
        this.toastr.error(err, 'Payment Detail Register');
      },
    });
  }
}
