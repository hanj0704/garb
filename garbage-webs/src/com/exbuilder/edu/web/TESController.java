package com.exbuilder.edu.web;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.plaf.synth.SynthSplitPaneUI;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.View;

import com.cleopatra.json.JSONArray;
import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.UploadFile;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

@Controller
@RequestMapping("/tes")
public class TESController {

	public TESController(){
		
	}
	

	@RequestMapping("/list.do")
	public void getList(HttpServletRequest request, HttpServletResponse response, DataRequest datareq)throws IOException, ParseException {
		
		System.out.println(request.getRemoteAddr());
		ParameterGroup paramGrp = datareq.getParameterGroup("");
		JSONParser parser= new JSONParser();
		
		JSONObject jsonob = new JSONObject();
//		String strs = "{\"LIST\": {\"CL\": [{\"SLOT_NO\":\"1\",\"WAFER_NO\":\"21\",\"WAFER_LOADED\":\"Y\"},{\"SLOT_NO\":\"2\",\"WAFER_NO\":\"22\",\"WAFER_LOADED\":\"Y\"},{\"SLOT_NO\":\"3\",\"WAFER_NO\":\"23\",\"WAFER_LOADED\":\"Y\"}],\"LP\" :[{\"LP_ID\":\"1\",\"LP_EXIST\":\"Y\",\"MAX_WAFER_CNT\":25,\"FOUP_LOADED\":\"Y\",\"LP_DOOR_STATUS\":\"N\"},{\"LP_ID\":\"2\",\"LP_EXIST\":\"Y\",\"MAX_WAFER_CNT\":25,\"FOUP_LOADED\":\"Y\",\"LP_DOOR_STATUS\":\"N\"},{\"LP_ID\":\"3\",\"LP_EXIST\":\"Y\",\"MAX_WAFER_CNT\":25,\"FOUP_LOADED\":\"Y\",\"LP_DOOR_STATUS\":\"N\"},{\"LP_ID\":\"4\",\"LP_EXIST\":\"Y\",\"MAX_WAFER_CNT\":25,\"FOUP_LOADED\":\"Y\",\"LP_DOOR_STATUS\":\"N\"}]},\"MAP\": {\"TM\": {\"TM_ROTATE\":90,\"A_ARM_EXIST\":\"TRUE\",\"B_ARM_EXIST\":\"FALSE\"},\"AL\" :{\"WAFER_LOADED\": \"Y\",\"WAFER_NO\" : \"13\"}}}";
//		String strs = "{\"books\":[{\"genre\":\"??????\",\"price\":\"100\",\"name\":\"????????? ???????????? ??????????\",\"writer\":\"????????????\",\"publisher\":\"???????????? ?????????\"},{\"genre\":\"??????\",\"price\":\"300\",\"name\":\"????????????\",\"writer\":\"??????\",\"publisher\":\"?????? ?????????\"},{\"genre\":\"??????\",\"price\":\"900\",\"name\":\"???????????????\",\"writer\":\"????????? ??????\",\"publisher\":\"????????? ?????? ?????????\"}],\"persons\":[{\"nickname\":\"????????????\",\"age\":\"25\",\"name\":\"?????????\",\"gender\":\"??????\"},{\"nickname\":\"?????????\",\"age\":\"21\",\"name\":\"?????????\",\"gender\":\"??????\"}]}";
//		Object parsedObj = parser.parse(strs);
//		jsonob.put("res",parsedObj);
		
		OutputStream out = null;
		
		try{
			
			out = response.getOutputStream();
			out.write(jsonob.toJSONString().getBytes());
			
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}finally {
			if(out != null){
				response.setContentLength(jsonob.toJSONString().getBytes().length);
				out.flush();
				out.close();
				out= null;
			}
		}
		
//		return new JSONDataView();
	}
	@RequestMapping("/page.do")
	public View pageChange(HttpServletRequest req, HttpServletResponse res, DataRequest datareq) throws IOException {
		
		UIView uiv = new UIView("/202202/tester.clx");
		
		return uiv;
	}
	
	@ResponseBody
	@RequestMapping("/fiTest.do")
	public void fitest(@RequestParam(value="file1", required = false) MultipartFile[] mf) throws IOException {
		System.out.println("zz");
		System.out.println(mf);
		System.out.println(mf.length);
		System.out.println(mf[1].getOriginalFilename());
//		System.out.println(mf.getName());
//		System.out.println(mf.getOriginalFilename());
	}
	
	@RequestMapping("/fileDabal.do")
	public void fileTest(HttpServletRequest req, HttpServletResponse res, DataRequest datareq) throws IOException {
		
		
		Map<String, UploadFile[]> uploadFiles = datareq.getUploadFiles();
		UploadFile[] uploadFiles2 = uploadFiles.get("tester");
	}
}
