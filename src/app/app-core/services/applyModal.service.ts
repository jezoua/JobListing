import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class ApplyModalService  {
  private isModalOpen = signal<boolean>(false);

  public isOpen = computed(()=> this.isModalOpen())

  open(){
    this.isModalOpen.set(true)
  }

  close(){

    this.isModalOpen.set(false)
  }


}
