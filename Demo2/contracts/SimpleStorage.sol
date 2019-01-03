pragma solidity ^0.4.24;

contract SimpleStorage {

  //保存图书的类型信息
  enum books_kind { Literature, Life, Psychology, History,Science , Unknow}

  uint public books_count=0;

  //一个图书的结构
  struct books {
    uint id;            //唯一编号
    string name;        //名称
    books_kind kind;    //类型
    uint count;         //数量
    uint remain_count; //剩余数量
    uint floor_number;  //楼层
    string bookshelf_num; //书架编号
    mapping (uint => bool) is_lent; //是否已经借出
    mapping (uint => address) owner_adr;//拥有者address
  }

  mapping(uint=> books) public books_list;

  //添加某种新的书籍
  function add_books (string Name, books_kind Kind, uint Count, uint Floor_number,string Bookshelf_num) public returns (bool){
    //不能添加同名书籍
    uint i = 0;
    for(i = 0;i < books_count ; i++){
      if(keccak256(abi.encodePacked(books_list[i].name)) == keccak256(abi.encodePacked(Name)))
      return false;
    }
    //添加书籍
    books_list[books_count] = books(books_count, Name, Kind, Count,Count, Floor_number,Bookshelf_num);
    for(i = 0; i < Count ; i++){
      books_list[books_count].is_lent[i]=false;
    }
    books_count++;
    return true;
  }

  //根据编号添加某一书籍的数量
  function add_id_count (uint id, uint num) public returns (bool){
    if(id >= books_count){
      return false;
    }
    for(uint i = books_list[id].count; i < books_list[id].count+num ; i++){
      books_list[id].is_lent[i]=false;
    }
    books_list[id].count += num;
    books_list[id].remain_count += num;
    return true;
  }

  //根据书籍的名称增加某一书籍的数量
  function add_name_count (string Name, uint num) public returns (bool){
    for(uint i = 0; i < books_count ; i++){
      if(keccak256(abi.encodePacked(books_list[i].name)) == keccak256(abi.encodePacked(Name))){
        add_id_count(books_list[i].id, num);
        return true;
      }
    }
    return false;
  }

  //根据编号移动书籍的楼层
  function move_id_floor (uint id, uint floor) public returns (bool){
    if(floor>5||floor<0){
      return false;
    }
    books_list[id].floor_number = floor;
    return true;
  }

  //根据编号移动书架的编号
  function move_id_bookshelf (uint id, string Bookshelf_num) public returns (bool){
    books_list[id].bookshelf_num = Bookshelf_num;
    return true;
  }

  //根据编号借书
  function lend_id (uint id) public returns (bool){
    if(id >= books_count){
      return false;
    }
    if(books_list[id].remain_count<1){
      return false;
    }
    uint index=0;
    for(uint i = 0; i < books_list[id].count ; i++){
      if(!books_list[id].is_lent[i]){
        index=i;
        break;
      }
    }
    books_list[id].is_lent[index]=true;
    books_list[id].owner_adr[index]=msg.sender;
    books_list[id].remain_count -= 1;
    return true;
  }

  //根据书籍的名称借书
  function lend_name (string Name) public returns (bool){
    for(uint i = 0; i < books_count ; i++){
      if(keccak256(abi.encodePacked(books_list[i].name)) == keccak256(abi.encodePacked(Name))){
        return lend_id(books_list[i].id);
      }
    }
    return false;
  }

  //根据编号还书
  function return_id(uint id) public returns (bool){
    if(id >= books_count){
      return false;
    }
    uint index=0;
    bool temp=false;
    for(uint i = 0; i < books_list[id].count ; i++){
      if(books_list[id].is_lent[i]){
        if(books_list[id].owner_adr[i]==msg.sender){
          index=i;
          temp=true;
          break;
        }
      }
    }
    if(!temp){
      return false;
    }
    books_list[id].is_lent[index]=false;
    books_list[id].remain_count += 1;
  }

  function return_name(string Name) public returns (bool){
    for(uint i = 0; i < books_count ; i++){
      if(keccak256(abi.encodePacked(books_list[i].name)) == keccak256(abi.encodePacked(Name))){
        return return_id(books_list[i].id);
      }
    }
    return false;
  }

  //查询某一书籍的具体信息
  function find_id (uint id) public view returns (uint, string, books_kind, uint,uint, uint,string) {
    if(id >= books_count){
      return (0, "", books_kind.Unknow,0,0,0,"");
    }
    return (books_list[id].id, books_list[id].name, books_list[id].kind, books_list[id].count,books_list[id].remain_count, books_list[id].floor_number,books_list[id].bookshelf_num);
  }

  //通过id和对应的书籍本数查看书籍是否借出和拥有者信息
  function find_id_num (uint id,uint book_num) public view returns(bool,bool,address){
    if(id >= books_count){
      return (false,false,address(0));
    }
    if(book_num>=books_list[id].count){
      return (false,false,address(0));
    }
    if(!books_list[id].is_lent[book_num]){
      return (true,false,address(0));
    }
    return (true,true,books_list[id].owner_adr[book_num]);
  }

  //查询书籍的种类数量
  function All_books_num () public view returns (uint) {
    return books_count;
  }


  uint storedData;
  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

}
