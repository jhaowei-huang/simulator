package com.cccclab.expertsystemsimulator.ui;

import com.cccclab.expertsystemsimulator.Simulator;
import com.cccclab.expertsystemsimulator.design.MainWindowDesign;
import com.vaadin.ui.Button;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.CustomLayout;
import com.vaadin.ui.MenuBar;
import com.vaadin.ui.MenuBar.MenuItem;

public class MainWindow extends CustomComponent {
	private MenuBar menu;
	
	public MainWindow() {
		super();
		CustomLayout layout = new CustomLayout("home");
		
		menu = new MenuBar();
		menu.setImmediate(false);
		menu.setWidth("100.0%");
		menu.setHeight("-1px");
		layout.addComponent(menu, "menu");
		
		MenuItem mi_file = menu.addItem("File", null);
		mi_file.addItem("New", null, null);
		mi_file.addItem("Open", null, null);
		mi_file.addItem("Save", null, null);
		MenuItem mi_edit = menu.addItem("Edit", null);
		mi_edit.addItem("add object", null, null);
		mi_edit.addItem("add event", null, null);
		mi_edit.addItem("add sensor", null, null);
		mi_edit.addItem("undo", null, null);
		mi_edit.addItem("redo", null, null);
		MenuItem mi_simu  = menu.addItem("simulator", null);
		
		MenuBar.Command cmd = new MenuBar.Command() {
		    public void menuSelected(MenuItem selectedItem) {
//		        selection.setValue("Ordered a " +
//		                           selectedItem.getText() +
//		                           " from menu.");
		    }  
		};
		
		Simulator simulator = new Simulator();
		layout.addComponent(simulator, "simulator");
		this.setCompositionRoot(layout);
	}
}
