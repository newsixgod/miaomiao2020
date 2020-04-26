<template>
    <div class="cinema_body">
        <Loading v-if="isLoading" />
        <Scroller v-else>
            <ul>
                <li v-for="item in cinemaList" :key="item.id">
                    <div>
                        <span>{{ item.nm }}</span>
                        <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{ item.addr }}</span>
                        <span>{{ item.distance }}</span>
                    </div>
                    <div class="card">
                        <div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class=" key | classCard ">{{ key | formatCard }}</div>
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
export default {
    name : 'CiList',
    data(){
        return {
            cinemaList : [],
            isLoading : true,
            prevCityId : -1   // 记录切换好的城市(即本页面的数据属于哪个城市的)
        };
    },
    activated(){
        var cityId = this.$store.state.city.id;   
        if( this.prevCityId === cityId ){ return; }  // 如果切换好的城市跟现在要切换的城市不一样就重新获取数据(即你点击了城市切换)
        this.isLoading = true;
        this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
            var msg = res.data.msg;
            if(msg === 'ok'){
                this.cinemaList = res.data.data.cinemas;
                this.isLoading = false;
                this.prevCityId = cityId;  
            }
        });
    },
    filters : {
        // 过滤器 后台传回来 num 是  0 1 0 1   这里有 1 的就匹配显示   看前面  v-if="num===1"
        // 后台传回来 allowRefund  endorse 等是英文，这里过滤器显示相应的中文，而且是 1 的就显示
        formatCard(key){
            var card = [
                { key : 'allowRefund' , value : '改签' },
                { key : 'endorse' , value : '退' },
                { key : 'sell' , value : '折扣卡' },
                { key : 'snack' , value : '小吃'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        },
        // 过滤器 显示的小标签给个颜色 后台传回来 num 是  0 1 0 1   这里有 1 的就匹配显示   看前面  v-if="num===1"
        // 后台传回来 allowRefund  endorse 等是英文，这里过滤器显示相应的中文，而且是 1 的就显示
        classCard(key){
            var card = [
                { key : 'allowRefund' , value : 'bl' },
                { key : 'endorse' , value : 'bl' },
                { key : 'sell' , value : 'or' },
                { key : 'snack' , value : 'or'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        }
    }
}
</script>

<style scoped>
    #content .cinema_body{ flex:1; overflow:auto;}
    .cinema_body ul{ padding:20px;}
    .cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
    .cinema_body div{ margin-bottom: 10px;}
    .cinema_body .q{ font-size: 11px; color:#f03d37;}
    .cinema_body .price{ font-size: 18px;}
    .cinema_body .address{ font-size: 13px; color:#666;}
    .cinema_body .address span:nth-of-type(2){ float:right; }
    .cinema_body .card{ display: flex;}
    .cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
    .cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
    .cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>