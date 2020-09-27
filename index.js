/**
 *  基类
 */ 
class Vue {
    constructor(options) {
        // options在这里是传入的参数对象
        this.$el = options.el;
        this.$data = options.data;
        // 根元素存在 编译模板
        if(this.$el) {
            new Compiler(this);
        }
    }
}
/**
 * 编译类 存放所有的编译方法
 */
class Compiler {
    constructor(vm) {
        // vm是同一个Vue实例
        this.vm = vm;
        this.el = this.isElementNode(vm.$el) ? vm.$el : document.querySelector(vm.$el);
        // 1. 把当前节点中的元素放到内存中，减少重排和重绘，即虚拟DOM
        let fragment = this.nodeToFragment(this.el);
        // 2. 把节点中的内容用数据进行替换， 即用数据编译模板
        this.compiler(fragment);
        // 3. 将替换后的内容塞到页面中
        this.el.appendChild(fragment);
    }
    /**
     * 判断是否是元素节点
     */
    isElementNode(node) {
        return node.nodeType === 1;
    }
    /**
     * 将节点中的元素都放到fragment中，即把节点放入到内存中
     */
    nodeToFragment(node) {
        // 创建一个文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = node.firstChild) {
            // appendChild具有移动性
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    /**
     * 用数据编译内存中的节点内容
     */
    compiler(fragment) {
        // 取出文档中所有的节点 类数组结构 
        let childNodes = fragment.childNodes;
        console.log(childNodes);
        [...childNodes].forEach(child => {
            if(this.isElementNode(child)) {
                // 如果是元素节点 判断元素节点的属性中是否有vue指令如v-model
                this.compilerElement(child);
            }else {
                // 如果是文本节点 判断文本是否包含{{}}语法
                this.compilerText(child);
            }
        });
    }
    /**
     * 判断属性是否是Vue指令
     */
    isDirective(attrName) {
        return attrName.startsWith('v-');
    }
    /**
     * 编译节点元素
     */
    compilerElement(node) {
        // 取出节点的所有的属性 类数组
        let attributes = node.attributes;
        [...attributes].forEach(attr => {
            // atrr 是 type="text" v-model="student.name"这样的键值对
            let {name, value} = attr;
            if(this.isDirective(name)) {
                // 是Vue的指令
                console.log(attr);
            }
        });
    }
    /**
     * 编译文本节点
     */
    compilerText(node) {

    }
}