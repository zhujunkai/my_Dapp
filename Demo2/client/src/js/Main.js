import React, { Component } from "react";
import "./../css/style.css";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({name: event.target.value});
    }
    render() {
        const { web3, accounts, contract} = this.props;
        var name = this.state.name;

        return(
            <div>
            <link href="./../css/bootstrap.min.css" rel="stylesheet"></link>
            <div class="container">
                <div class="row">
                    <div class="t_title">
                    <label class="text-center">书库</label>
                    <hr/>
                    <br/>
                    </div>
                </div>

                <div class="Add">
                    <label class="text_add">Add New Goods</label>
                    <div class="Add_input">
                    <label for="input-goods-name">New Goods Name : </label>
                    <input type="text" id="input-goods-name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div class="Add_input">
                        <label for="input-goods-number">New Goods Number : </label>
                        <input type="text" id="input-goods-number"/>
                    </div>
                    <div class="Add_input">
                        <label for="input-goods-Price">New Goods Price : </label>
                        <input type="text" id="input-goods-Price"/>
                    </div>

                    <button id="submit-goods-info">添加商品</button>

                    <div action="" class="parent">
                        <input type="text" id="search_input" placeholder="输入搜索的商品名称"/>
                        <button id="search_button">搜索</button>
                        <button id="reset_button"></button>
                    </div>
                

                </div>

                <div id="petsRow" class="goodsrow">
                </div>
            </div>

            <div id="petTemplate">
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="panel panel-default panel-pet">
                <div class="panel-heading">
                    <h3 class="panel-title" id="get_id">Scrappy</h3>
                </div>
                <div class="panel-body">
                    <img alt="140x140" data-src="holder.js/140x140" class="img-rounded img-center img-style" src="https://animalso.com/wp-content/uploads/2017/01/Golden-Retriever_6.jpg" data-holder-rendered="true"/>
                    <br/><br/>
                    <strong>Goods Name</strong>: <span class="pet-breed">Golden Retriever</span><br/>
                    <strong>Goods Number</strong>: <span class="pet-age">3</span><br/>
                    <strong>Goods Price</strong>: <span class="pet-location">Warren, MI</span><br/><br/>
                    <button class="btn btn-default btn-adopt" type="button" data-id="0" id="change_button">修改货物信息</button>
                </div>
                </div>
            </div>
            </div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="./bootstrap.min.js"></script>
            </div>
    );
    }
};

export default Main;