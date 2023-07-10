package com.kh.backend_finalproject.entitiy;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.json.JSONObject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class FestivalTb {
    @Id
    @Column
    private String contentId;

    @Column
    private String addr1;

    @Column
    private String areacode;

    @Column
    private String eventstartdate;

    @Column
    private String eventenddate;

    @Column(length = 500)
    private String firstimage;

    @Column
    private String title;

    @Column
    private String tel;

    @Column
    private String mapy;

    @Column
    private String mapx;

    public FestivalTb(JSONObject item) {
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
}
