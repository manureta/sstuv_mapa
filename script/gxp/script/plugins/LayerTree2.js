/**
 * Copyright (c) 2008-2011 The Open Planning Project
 *
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires plugins/Tool.js
 * @requires GeoExt/widgets/tree/LayerNode.js
 * @requires GeoExt/widgets/tree/TreeNodeUIEventMixin.js
 * @requires GeoExt/widgets/tree/LayerContainer.js
 * @requires GeoExt/widgets/tree/LayerLoader.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = LayerTree
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: LayerTree(config)
 *
 *    Plugin for adding a tree of layers to a :class:`gxp.Viewer`. Also
 *    provides a context menu on layer nodes.
 */
gxp.plugins.LayerTree = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = gxp_layertree */
    ptype: "gxp_layertree",

    /** api: config[shortTitle]
     *  ``String``
     *  Short title text for this plugin's output (i18n)
     */
    shortTitle: "Layers",

    /** api: config[rootNodeText]
     *  ``String``
     *  Text for root node of layer tree (i18n).
     */
    rootNodeText: "Layers",

    /** api: config[overlayNodeText]
     *  ``String``
     *  Text for overlay node of layer tree (i18n).
     */
    overlayNodeText: "Overlays",

    /** api: config[baseNodeText]
     *  ``String``
     *  Text for baselayer node of layer tree (i18n).
     */
    baseNodeText: "Base Layers",

    /** api: config[groups]
     *  ``Object`` The groups to show in the layer tree. Keys are group names,
     *  and values are either group titles or an object with ``title`` and
     *  ``exclusive`` properties. ``exclusive``, if Boolean, means that nodes
     *  will have radio buttons instead of checkboxes, so only one layer of the
     *  group can be active at a time. If String, ``exclusive`` can be used to
     *  create exclusive sets of layers among several groups, by assigning the
     *  same string to each group. Optional, the default is
     *
     *  .. code-block:: javascript
     *
     *      groups: {
     *          "default": "Overlays", // title can be overridden with overlayNodeText
     *          "background": {
     *              title: "Base Layers", // can be overridden with baseNodeText
     *              exclusive: true
     *          }
     *      }
     */
//    groups: null,
  groups: {
                "zoni" : {title: "Zonificación", expanded: false},
                "ley" : {title: "Áreas - Ley 8912/77", expanded: false},
                "zonas" : {title: "Zonas y Espacios - Art. 7 Ley 8912/77",  expanded: false},
                "uc" : {title: "Urbanizaciones Cerradas",  expanded: false},
                "asen" : {title: "Asentamientos Precarios",  expanded: false},
                "etapas" : {title: "Etapas del Proceso de Planeamiento",  expanded: false},
                "dec" : {title: "Decreto 3202",  expanded: false},
                "lim" : {title: "Limite de Cuencas",  expanded: false},
                "muni" : {title: "Municipalidades",  expanded: false},
                "cuencas" : {title: "Cuencas",  expanded: false},
                "default": "Capas Agregadas",
                "consulta" : {title: "Resultados", expanded: false},
                "background" : {title: "Capas Base", exclusive: true, expanded: true}
            },
/****************************
 "zoni" : {title: "Zonificación", expanded:false, isOnlyFolder: true, expanded: false,
                            groups: {
                                      "jef": {title: "Jefaturas", expanded:false},
                                      "cie": {title: "CIIE", expanded:false},
                                    }
                        },
*/////////////////////////////////////////////////
    /** api: config[defaultGroup]
     *  ``String`` The name of the default group, i.e. the group that will be
     *  used when none is specified. Defaults to ``default``.
     */
    defaultGroup: "default",

    /** private: config[treeNodeUI]
     *  ``Ext.tree.TreeNodeUI``
     */
    treeNodeUI: null,




    /** private: method[constructor]
     *  :arg config: ``Object``
     */

    constructor: function(config) {
        gxp.plugins.LayerTree.superclass.constructor.apply(this, arguments);
        if (!this.groups) {
            this.groups = {
                "default": this.overlayNodeText,
                "background": {
                    title: this.baseNodeText,
                    exclusive: true
                }
            };
        }

        if (!this.treeNodeUI) {
            this.treeNodeUI = Ext.extend(
                GeoExt.tree.LayerNodeUI,
                new GeoExt.tree.TreeNodeUIEventMixin()
            );
        }
    },

    /** private: method[addOutput]
     *  :arg config: ``Object``
     *  :returns: ``Ext.Component``
     */
    addOutput: function(config) {
        config = Ext.apply(this.createOutputConfig(), config || {});
        var output = gxp.plugins.LayerTree.superclass.addOutput.call(this, config);
        output.on({
            contextmenu: this.handleTreeContextMenu,
            beforemovenode: this.handleBeforeMoveNode,
            scope: this
        });
        return output;
    },


/////// agregado /////////////////////////////////////////////////////////////

createNestedNode: function(node, groups, baseAttrs){

    var defaultGroup = this.defaultGroup,
    plugin = this,
    groupConfig,
    exclusive;
    var newNode;
    for (var group in groups) {
        groupConfig = typeof this.groups[group] == "string" ?
            {title: groups[group]} : groups[group];
        exclusive = groupConfig.exclusive;
        if( !groupConfig.isOnlyFolder ){
            newNode = new GeoExt.tree.LayerContainer(Ext.apply({
                text: groupConfig.title,
                iconCls: "gxp-folder",
                expanded: true,
                group: group == this.defaultGroup ? undefined : group,
                loader: new GeoExt.tree.LayerLoader({
                baseAttrs: exclusive ?
                Ext.apply({checkedGroup: Ext.isString(exclusive) ? exclusive : group}, baseAttrs)                           : baseAttrs,
                    store: this.target.mapPanel.layers,
                    filter: (function(group) {
                        return function(record) {
                                return (record.get("group") || defaultGroup) == group &&
                                record.getLayer().displayInLayerSwitcher == true;
                        };
                    })(group),
                    createNode: function(attr) {
                            plugin.configureLayerNode(this, attr);
                            return  GeoExt.tree.LayerLoader.prototype.createNode.apply(this, arguments);
                    }
                }),
                singleClickExpand: true,
                allowDrag: false,
                listeners: {
                    append: function(tree, node) {
                        node.expand();
                    }
                }
            }, groupConfig));
            node.appendChild( newNode );
        } else {
            newNode = new Ext.tree.TreeNode({
                text: groupConfig.title,
                expanded: groupConfig.expanded
            });
            node.appendChild( newNode );
        }

        if( groupConfig.groups ){
            this.createNestedNode( newNode, groupConfig.groups, baseAttrs );
        }
    }
},

// embrapa
// adaptação para implementar o suporte a árvores com níveis e subníveis
createOutputConfig: function() {
    var treeRoot = new Ext.tree.TreeNode({
        text: this.rootNodeText,
        expanded: true,
        isTarget: false,
        allowDrop: false
    });

    var baseAttrs;
    if (this.initialConfig.loader && this.initialConfig.loader.baseAttrs) {
        baseAttrs = this.initialConfig.loader.baseAttrs;
    }

    this.createNestedNode(treeRoot, this.groups, baseAttrs);

    return {
        xtype: "treepanel",
        root: treeRoot,
        rootVisible: false,
        shortTitle: this.shortTitle,
        border: false,
        enableDD: true,
        selModel: new Ext.tree.DefaultSelectionModel({
        listeners: {
            beforeselect: this.handleBeforeSelect,
            scope: this
        }
    }),
    listeners: {
            contextmenu: this.handleTreeContextMenu,
            beforemovenode: this.handleBeforeMoveNode,
            scope: this
    },
    contextMenu: new Ext.menu.Menu({
            items: []
             })
    };
},

////////////////////////////////////////////////////////////////////

    /** private: method[createOutputConfig]
     *  :returns: ``Object`` Configuration object for an Ext.tree.TreePanel
     */
 /*
    createOutputConfig: function() {
        var treeRoot = new Ext.tree.TreeNode({
            text: this.rootNodeText,
            expanded: true,
            isTarget: false,
            allowDrop: false
        });

        var baseAttrs;
        if (this.initialConfig.loader && this.initialConfig.loader.baseAttrs) {
            baseAttrs = this.initialConfig.loader.baseAttrs;
        }

        var defaultGroup = this.defaultGroup,
            plugin = this,
            groupConfig,
            exclusive;
        for (var group in this.groups) {
            groupConfig = typeof this.groups[group] == "string" ?
                {title: this.groups[group]} : this.groups[group];
            exclusive = groupConfig.exclusive;
            treeRoot.appendChild(new GeoExt.tree.LayerContainer(Ext.apply({
                text: groupConfig.title,
                iconCls: "gxp-folder",
                expanded: true,
                group: group == this.defaultGroup ? undefined : group,
                loader: new GeoExt.tree.LayerLoader({
                    baseAttrs: exclusive ?
                        Ext.apply({checkedGroup: Ext.isString(exclusive) ? exclusive : group}, baseAttrs) :
                        baseAttrs,
                    store: this.target.mapPanel.layers,
                    filter: (function(group) {
                        return function(record) {
                            return (record.get("group") || defaultGroup) == group &&
                                record.getLayer().displayInLayerSwitcher == true;
                        };
                    })(group),
                    createNode: function(attr) {
                        plugin.configureLayerNode(this, attr);
                        return GeoExt.tree.LayerLoader.prototype.createNode.apply(this, arguments);
                    }
                }),
                singleClickExpand: true,
                allowDrag: false,
                listeners: {
                    append: function(tree, node) {
                        node.expand();
                    }
                }
            }, groupConfig)));
        }

        return {
            xtype: "treepanel",
            root: treeRoot,
            rootVisible: false,
            shortTitle: this.shortTitle,
            border: false,
            enableDD: true,
            selModel: new Ext.tree.DefaultSelectionModel({
                listeners: {
                    beforeselect: this.handleBeforeSelect,
                    scope: this
                }
            }),
            contextMenu: new Ext.menu.Menu({
                items: []
            })
        };
    },
    */
    /** private: method[configureLayerNode]
     *  :arg loader: ``GeoExt.tree.LayerLoader``
     *  :arg node: ``Object`` The node
     */
    configureLayerNode: function(loader, attr) {
        attr.uiProvider = this.treeNodeUI;
        var layer = attr.layer;
        var store = attr.layerStore;
        if (layer && store) {
            var record = store.getAt(store.findBy(function(r) {
                return r.getLayer() === layer;
            }));
            if (record) {
                attr.qtip = record.get('abstract');
                if (!record.get("queryable") && !attr.iconCls) {
                    attr.iconCls = "gxp-tree-rasterlayer-icon";
                }
                if (record.get("fixed")) {
                    attr.allowDrag = false;
                }
                attr.listeners = {
                    rendernode: function(node) {
                        if (record === this.target.selectedLayer) {
                            node.select();
                        }
                        this.target.on("layerselectionchange", function(rec) {
                            if (!this.selectionChanging && rec === record) {
                                node.select();
                            }
                        }, this);
                    },
                    scope: this
                };
            }
        }
    },

    /** private: method[handleBeforeSelect]
     */
    handleBeforeSelect: function(selModel, node) {
         var changed = true;
         var layer = node && node.layer;
         var record;
         if (layer) {
             var store = node.layerStore;
             record = store.getAt(store.findBy(function(r) {
                 return r.getLayer() === layer;
             }));
         }
         this.selectionChanging = true;
         changed = this.target.selectLayer(record);
         this.selectionChanging = false;
         return changed;
     },

    /** private: method[handleTreeContextMenu]
     */
    handleTreeContextMenu: function(node, e) {
        if(node && node.layer) {
            node.select();
            var tree = node.getOwnerTree();
            if (tree.getSelectionModel().getSelectedNode() === node) {
                var c = tree.contextMenu;
                c.contextNode = node;
                c.items.getCount() > 0 && c.showAt(e.getXY());
            }
        }
    },

    /** private: method[handleBeforeMoveNode]
     */
    handleBeforeMoveNode: function(tree, node, oldParent, newParent, i) {
        // change the group when moving to a new container
        if(oldParent !== newParent) {
            var store = newParent.loader.store;
            var index = store.findBy(function(r) {
                return r.getLayer() === node.layer;
            });
            var record = store.getAt(index);
            record.set("group", newParent.attributes.group);
        }
    }

});

Ext.preg(gxp.plugins.LayerTree.prototype.ptype, gxp.plugins.LayerTree);
