package com.cccclab.expertsystemsimulator;

import javax.servlet.annotation.WebServlet;

import com.cccclab.expertsystemsimulator.ui.MainWindow;
import com.vaadin.annotations.Theme;
import com.vaadin.annotations.VaadinServletConfiguration;
import com.vaadin.server.VaadinRequest;
import com.vaadin.server.VaadinServlet;
import com.vaadin.ui.Button;
import com.vaadin.ui.Button.ClickEvent;
import com.vaadin.ui.Label;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;

@SuppressWarnings("serial")
@Theme("expertsystemsimulator")
public class ExpertsystemsimulatorUI extends UI {

	@WebServlet(value = "/*", asyncSupported = true)
	@VaadinServletConfiguration(productionMode = false, ui = ExpertsystemsimulatorUI.class)
	public static class Servlet extends VaadinServlet {
	}

	@Override
	protected void init(VaadinRequest request) {
		// setContent(new Button("click"));
		// setContent(new Simulator());
		setContent(new MainWindow());
	}
}