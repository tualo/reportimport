Ext.define('Ext.cmp.cmp_hbksplit.Viewport', {
  extend: 'Ext.tualo.ApplicationPanel',
  requires: [ 
  ],
  layout: 'fit',
  listeners: {
    boxReady: 'onBoxReady',
    resize: 'onResize'
  },
   
  items: [
    {
      xtype: 'grid',
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            { xtype: 'button', text: 'Dateiupload', handler: function(){
              var dialog = Ext.create('Ext.tualo.Window', {
                title: 'Belege hochladen',
                layout: 'fit',
                items: [
                  {
                    xtype: 'tualocontextdduploadlist',
                    uploadUrl:  "./hbksplit/upload",
                    listeners: {
                      done: function(){
                        }
                    }
                  }
                ],
                modal: true
              });
          
              dialog.show();
              dialog.resizeMe();
            } 
          }
        ]
    }],

    columns: [{
      text: 'Status',
      xtype: 'widgetcolumn',
      width: 120,
      widget: {
          bind: '{record.progress}',
          xtype: 'progressbarwidget',
          textTpl: [
              '{percent:number("0")}%'
          ]
      }
  },{
      header: 'ID',
      hidden: true,
      dataIndex: 'id',
      flex: 2
      },{
          header: 'Datei',
          dataIndex: 'uploadname',
          flex: 2
      },{
        header: 'Sendungen',
        dataIndex: 'documents_quantity',
        flex: 1,
        //renderer: Ext.util.Format.fileSize
      }, {
        header: 'Seitengesamt',
        dataIndex: 'pagecount',
        flex: 1,
        //renderer: Ext.util.Format.fileSize
      }, {
        header: 'Verarbeitet',
        dataIndex: 'currentpage',
        flex: 1,
        //renderer: Ext.util.Format.fileSize
      }, {
        header: 'erneut Verarbeiten',
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            xtype: 'button',
            iconCls: 'fa fa-redo-alt',
            config:{
              recordid: ''
            },
            publishes: 'recordid',
            bind: {
              recordid:'{record.id}'
            },
            listeners: {
              click: function(btn,event){

                Tualo.Ajax.request({
                  showWait: true,
                  timeout: 10*60000,
                  url: './hbksplit/restart/'+btn.getWidgetRecord().get('id'),
                  params: {
                    
                  },
                  json: function(o){
                      if (o.success){
                        
                          me.fireEvent('cancled');
                          Ext.toast({
                              html: "Alle Daten verarbeitet",
                              title: 'Information',
                              width: 400,
                              align: 't'
                           });
      
                      }else{
                        Ext.toast({
                          html: o.msg,
                          title: 'Fehler',
                          width: 400,
                          align: 't',
                          iconCls: 'fa fa-warning'
                       });
                      }
                    }
                  });
          
          
                console.log(btn.getWidgetRecord(),event)
              }
            }
        }
        //renderer: Ext.util.Format.fileSize
      }, {
        header: 'Löschen',
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            xtype: 'button',
            iconCls: 'fa fa-trash',
            config:{
              recordid: ''
            },
            publishes: 'recordid',
            bind: {
              recordid:'{record.id}'
            },
            listeners: {
              click: function(btn,event){

                Tualo.Ajax.request({
                  showWait: true,
                  timeout: 10*60000,
                  url: './hbksplit/delete/'+btn.getWidgetRecord().get('id'),
                  params: {
                    
                  },
                  json: function(o){
                      if (o.success){
                        
                          me.fireEvent('cancled');
                          Ext.toast({
                              html: "Alle Daten verarbeitet",
                              title: 'Information',
                              width: 400,
                              align: 't'
                           });
      
                      }else{
                        Ext.toast({
                          html: o.msg,
                          title: 'Fehler',
                          width: 400,
                          align: 't',
                          iconCls: 'fa fa-warning'
                       });
                      }
                    }
                  });
          
          
                console.log(btn.getWidgetRecord(),event)
              }
            }
        }
        //renderer: Ext.util.Format.fileSize
      },{
        header: 'HBK',
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            xtype: 'button',
            iconCls: 'fa fa-angle-double-right',
            config:{
              recordid: ''
            },
            publishes: 'recordid',
            bind: {
              recordid:'{record.id}'
            },
            listeners: {
              click: function(btn,event){

                Tualo.Ajax.request({
                  showWait: true,
                  timeout: 10*60000,
                  url: './hbksplit/move/'+btn.getWidgetRecord().get('id'),
                  params: {
                    
                  },
                  json: function(o){
                      if (o.success){
                        
                          me.fireEvent('cancled');
                          Ext.toast({
                              html: "Alle Daten verarbeitet",
                              title: 'Information',
                              width: 400,
                              align: 't'
                           });
      
                      }else{
                        Ext.toast({
                          html: o.msg,
                          title: 'Fehler',
                          width: 400,
                          align: 't',
                          iconCls: 'fa fa-warning'
                       });
                      }
                    }
                  });
          
          
                console.log(btn.getWidgetRecord(),event)
              }
            }
        }
        //renderer: Ext.util.Format.fileSize
      }],

      viewConfig: {
          emptyText: 'Keine Dokumente vorhanden',
          deferEmptyText: false
      },
      store: {
        type: 'json',
        autoLoad: true,
        model: 'Ext.cmp.cmp_hbksplit.StatusModel',
        proxy: {
          type: 'ajax',
          url: './hbksplit/status',
          reader: {
              type: 'json',
              rootProperty: 'data'
          }
        },
        listeners: {
          load: function(store){
            if (!store.destroyed){
              Ext.defer(store.load , 5000, this, [ ]);
            }
          }
        },
      },

      

  }
  ],
  routeTo: function(val){

  },
  statics: {
    canRouteTo: function(val) {
      var r = Ext.cmp.cmp_template_default.controller.Viewport.requestParams(val);
      if (typeof r=='object'){
        if (typeof r.t=='string'){
            if (typeof Ext.ClassManager.get('Tualo.DataSets.views.'+r.t)=='function'){
                return true; 
            }
        }
      }
      console.warn('DS not accessible',val);
      return false;
    }
  }
});
