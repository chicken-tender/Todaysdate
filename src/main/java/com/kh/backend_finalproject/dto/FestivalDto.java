package com.kh.backend_finalproject.dto;

import com.kh.backend_finalproject.entitiy.FestivalTb;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.json.JSONObject;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FestivalDto {
    private String contentId;
    private String addr1;
    private String areacode;
    private String eventstartdate;
    private String eventenddate;
    private String firstimage;
    private String title;
    private String tel;
    private String mapy;
    private String mapx;

    public FestivalDto(JSONObject item) {
        this.contentId = item.getString("contentid");
        this.addr1 = item.getString("addr1");
        this.areacode = item.getString("areacode");
        this.eventstartdate = item.getString("eventstartdate");
        this.eventenddate = item.getString("eventenddate");
        this.firstimage = item.getString("firstimage");
        this.title = item.getString("title");
        this.tel = item.getString("tel");
        this.mapx = item.getString("mapx");
        this.mapy = item.getString("mapy");
    }

    public FestivalDto(FestivalTb festivalTb) {
    }
}
