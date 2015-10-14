package com.cccclab.expertsystemsimulator.ui;

import com.vaadin.ui.Button;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.CustomLayout;
import com.vaadin.ui.PasswordField;
import com.vaadin.ui.TextField;

public class LoginBox extends CustomComponent {
	public LoginBox() {
		super();
		CustomLayout layout = new CustomLayout("customlayout");
		
		final TextField username = new TextField();
        username.setWidth(100.0f, Unit.PERCENTAGE);
        layout.addComponent(username, "username");

        final PasswordField password = new PasswordField();
        password.setWidth(100.0f, Unit.PERCENTAGE);
        layout.addComponent(password, "password");

        final Button ok = new Button("Login");
        layout.addComponent(ok, "okbutton");
        this.setCompositionRoot(layout);
	}
}
