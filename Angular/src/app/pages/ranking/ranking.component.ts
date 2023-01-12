import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const SBUrl = "http://localhost:8080/api/public";

interface Friend {
  nome: string,
  cognome: string,
  age: number,
  id: number
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})

export class RankingComponent implements OnInit {
  usersOrdered!: User[];
  dataSource: any;

  constructor(private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal) { }
/*
  @ViewChild(MatPaginator) paginator:any = MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }*/

  ngOnInit(): void {
    this.fetchAllUsers();
  }


  fetchAllUsers(){
    this.http.get<User[]>(`http://localhost:4567/top10`).subscribe((data)=> {
      this.usersOrdered = data;
      this.dataSource = new MatTableDataSource(this.usersOrdered);
      console.log(this.usersOrdered, this.dataSource);
    });
  }

  displayedColumns = ["count", "userName", "score", "data"];

  open(content: any) {
		this.modalService.open(content);
    }

  openDelete(targetModal: any, friend: Friend) {
      const deleteId = friend.id;
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg'
      });
  }
}
