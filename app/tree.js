// armazena a tree principal
var layerRoot;
// armazena a o na da tree do monitoramento
var noMonitoramento;

// variavel que define o nome do grupo de dados incluidos de fontes externas
var _groupDadosExternos = "external";

var _usernode = "user_node";

function criaTree() {

    layerRoot = new Ext.tree.TreeNode({
        text: "Google",
        expanded: false
    });

    // mapas google
    var googleMaps = new GeoExt.tree.BaseLayerContainer({
        id: _groupDadosExternos,
        text: "Capas Base",
        loader: {
            baseAttrs: {
                iconCls: 'base-layer-icon'
            }
            /*filter: function(record) {
             return record.get("layer").group == "background"
             }	*/
        },
        leaf: false,
        map: map,
        expanded: false
    });
    layerRoot.appendChild(googleMaps);

// Dados Externos
    var noDadosExternos = new GeoExt.tree.LayerContainer({
        id: _usernode,
        text: 'Capas Externas',
        loader: {
            baseAttrs: {
                iconCls: 'layer-icon'
            },
            filter: function(record) {
                return record.get("layer").group == _groupDadosExternos || record.get("group") == _groupDadosExternos;
            }
        },
        map: map,
        expanded: false
    });
    layerRoot.appendChild(noDadosExternos);

    // Unidades educativas ////////////////////////////////////////////////////////////////////
    var uni_edu = new Ext.tree.TreeNode({
        text: "Unidades Educativas",
        expanded: false
    });
    layerRoot.appendChild(uni_edu);


    // Gestion Estatal
    var gestion_estatal = new GeoExt.tree.LayerContainer({
        text: 'Gestion Estatal',
        loader: {
            baseAttrs: {
                //iconCls: 'layer-icon'
            },
            filter: function(record) {
                return record.get("layer").group == "comun"
            }
        },
        map: map,
        expanded: false
    });
    uni_edu.appendChild(gestion_estatal);

    // otros organismos ////////////////////////////////////////////////////////////////////
    var otros_org = new Ext.tree.TreeNode({
        text: "Organismos de Educación Descentralizados",
        expanded: false
    });
    layerRoot.appendChild(otros_org);


    // otros organismos
    var org = new GeoExt.tree.LayerContainer({
        text: 'Jefaturas',
        loader: {
            baseAttrs: {
                //iconCls: 'layer-icon'
            },
            filter: function(record) {
                return record.get("layer").group == "jef"
            }

        },
        map: map,
        expanded: false
    });
    otros_org.appendChild(org);

    // otros organismos
    var cie = new GeoExt.tree.LayerContainer({
        text: 'CIIE',
        loader: {
            baseAttrs: {
                //iconCls: 'layer-icon'
            },
            filter: function(record) {
                return record.get("layer").group == "cie"
            }

        },
        map: map,
        expanded: false
    });
    otros_org.appendChild(cie);

    //predios ////////////////////////////////////////////////////////////////////
    var predios = new Ext.tree.TreeNode({
        text: "Predios",
        expanded: false
    });
    layerRoot.appendChild(predios);

    // predios
    var parce = new GeoExt.tree.LayerContainer({
        text: 'Predios',
        loader: {
            baseAttrs: {
                //iconCls: 'layer-icon'
            },
            filter: function(record) {
                return record.get("layer").group == "predios"
            }
        },
        map: map,
        expanded: false
    });
    predios.appendChild(parce);

    // Mapas Temáticos
    var tematicos = new GeoExt.tree.LayerContainer({
        text: 'Mapas Temáticos',
        loader: {
            baseAttrs: {
                iconCls: 'layer-icon'
            },
            filter: function(record) {
                return record.get("layer").group == "tematicos"
            }
        },
        map: map,
        expanded: false
    });
    layerRoot.appendChild(tematicos);


}