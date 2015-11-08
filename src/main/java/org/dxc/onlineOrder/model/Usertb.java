package org.dxc.onlineOrder.model;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
//@Log4j
//@NoArgsConstructor
//@AllArgsConstructor
public class Usertb implements Serializable {
	
	private static final long serialVersionUID = -2337277375220320579L;
	
		Integer age ;
        Integer id ;
        Date ucreatetime;
        String uname;
		public Integer getAge() {
			return age;
		}
		public void setAge(Integer age) {
			this.age = age;
		}
		public Integer getId() {
			return id;
		}
		public void setId(Integer id) {
			this.id = id;
		}
		public Date getUcreatetime() {
			return ucreatetime;
		}
		public void setUcreatetime(Date ucreatetime) {
			this.ucreatetime = ucreatetime;
		}
		public String getUname() {
			return uname;
		}
		public void setUname(String uname) {
			this.uname = uname;
		}
        

}
