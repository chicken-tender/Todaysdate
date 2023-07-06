import styled from "@emotion/styled";

export const ColumnWrapper = styled.div((props) => ({
  margin: props.margin || "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: props.gap || "",
  width: props.width || "100%",
  alignItems: props.alignItems || "",
  justifyContent: props.justifyContent || "",
  "@media screen and (max-width:768px)": {
    width: props.responsiveWidth || "80%",
  },
}));

export const RowWrapper = styled.div((props) => ({
  margin: props.margin || "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: props.justifyContent || "flex-start",
  gap: props.gap || "",
  "@media screen and (max-width:768px)": {
    width: props.responsiveWidth || "80%",
    gap: props.responsiveGap || "",
  },
}));
