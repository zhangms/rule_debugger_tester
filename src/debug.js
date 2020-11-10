import React from "react";
import { Tree } from "antd";

class RuleDebuger extends React.Component {
  constructor(props) {
    super(props);
    this.treeData = this.initTreeData();
  }

  initTreeData() {
    const data = {
      data: [
        {
          rule: {
            id: 1901,
            name: "调试策略1",
            packageId: 1851,
            packageName: "调试策略包",
            actionName: "ALIME_转人工",
            level: 1,
            packageLevel: 1
          },
          response: {
            counsel: {
              action: "transfer",
              rule: {
                packageLevel: 1,
                level: 1,
                name: "调试策略1",
                packageId: 1851,
                id: 1901,
                packageName: "调试策略包",
                actionName: "ALIME_转人工"
              },
              params: {
                reply: "说你好转人工",
                skillGroupId: "01"
              }
            },
            Messages: [
              {
                Type: "text",
                Text: {
                  AnswerSource: "COUNSEL",
                  Content: "说你好转人工"
                }
              }
            ],
            SessionId: "111",
            MessageId: "a27d06b3f6d4417cbe45bb073a91c7ef"
          },
          invokeChain: {
            id: "execPre",
            enterTime: 1601205454726,
            exitTime: 1601205454729,
            runningTimeMs: 3,
            exitFlag: "SUC",
            returnObject: true,
            children: [
              {
                id: "rule",
                enterTime: 1601205454728,
                exitTime: 1601205454728,
                runningTimeMs: 0,
                exitFlag: "SUC",
                returnObject: false,
                embedding: {
                  packageLevel: 3,
                  level: 1,
                  packageId: 1701,
                  ruleName: "DEMO高兴",
                  packageName: "DEMO情绪策略包",
                  ruleId: 1702,
                  actionName: "ALIME_回复话术"
                },
                children: [
                  {
                    id: "and",
                    enterTime: 1601205454728,
                    exitTime: 1601205454728,
                    runningTimeMs: 0,
                    exitFlag: "SUC",
                    returnObject: false,
                    embedding: {
                      name: "与"
                    },
                    children: [
                      {
                        id: "logic",
                        enterTime: 1601205454728,
                        exitTime: 1601205454728,
                        runningTimeMs: 0,
                        exitFlag: "SUC",
                        returnObject: false,
                        embedding: {
                          op: "eq",
                          left: "data.emotion.emotionName",
                          name: "情绪识别_情绪名称 等于 感谢",
                          right: "thankful",
                          value: "NULL"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                id: "rule",
                enterTime: 1601205454728,
                exitTime: 1601205454729,
                runningTimeMs: 1,
                exitFlag: "SUC",
                returnObject: false,
                embedding: {
                  packageLevel: 1,
                  level: 1,
                  packageId: 1851,
                  ruleName: "意图调试",
                  packageName: "调试策略包",
                  ruleId: 1852,
                  actionName: "ALIME_转人工"
                },
                children: [
                  {
                    id: "and",
                    enterTime: 1601205454728,
                    exitTime: 1601205454729,
                    runningTimeMs: 1,
                    exitFlag: "SUC",
                    returnObject: false,
                    embedding: {
                      name: "与"
                    },
                    children: [
                      {
                        id: "time",
                        enterTime: 1601205454728,
                        exitTime: 1601205454728,
                        runningTimeMs: 0,
                        exitFlag: "SUC",
                        returnObject: true,
                        embedding: {
                          name: "每天00:03~23:03"
                        }
                      },
                      {
                        id: "logic",
                        enterTime: 1601205454728,
                        exitTime: 1601205454729,
                        runningTimeMs: 1,
                        exitFlag: "SUC",
                        returnObject: false,
                        embedding: {
                          op: "eq",
                          left: "data.robot.Messages[0].Text.Ext.intentName",
                          name: "机器人首轮意图 等于 查天气意图",
                          right: "查天气意图",
                          value: "NULL"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                id: "rule",
                enterTime: 1601205454729,
                exitTime: 1601205454729,
                runningTimeMs: 0,
                exitFlag: "SUC",
                returnObject: true,
                embedding: {
                  packageLevel: 1,
                  level: 1,
                  packageId: 1851,
                  ruleName: "调试策略1",
                  packageName: "调试策略包",
                  ruleId: 1901,
                  actionName: "ALIME_转人工"
                },
                children: [
                  {
                    id: "and",
                    enterTime: 1601205454729,
                    exitTime: 1601205454729,
                    runningTimeMs: 0,
                    exitFlag: "SUC",
                    returnObject: true,
                    embedding: {
                      name: "与"
                    },
                    children: [
                      {
                        id: "logic",
                        enterTime: 1601205454729,
                        exitTime: 1601205454729,
                        runningTimeMs: 0,
                        exitFlag: "SUC",
                        returnObject: true,
                        embedding: {
                          op: "stringContains",
                          left: "request.utterance",
                          name: "用户问句 字符串左值包含任意右值 你好",
                          right: '["你好"]',
                          value: "你好"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ],
      success: true,
      code: null,
      message: null
    };
    const node = this.toTreeNode(data.data[0].invokeChain, 0);
    return node == null ? [] : [node];
  }

  toTreeNode(chainNode, idx) {
    const treeNode = {
      key: chainNode.id + "_" + idx,
      title: "",
      children: []
    };
    switch (chainNode.id) {
      case "execPre":
        treeNode.title = "前置策略";
        if (chainNode.returnObject) {
          treeNode.title += "命中:";
          treeNode.title +=
            chainNode.children[
              chainNode.children.length - 1
            ].embedding.ruleName;
        } else {
          treeNode.title += "未命中";
        }
        break;
      case "execPost":
        treeNode.title = "后置策略";
        if (chainNode.returnObject) {
          treeNode.title += " 命中:";
          treeNode.title +=
            chainNode.children[
              chainNode.children.length - 1
            ].embedding.ruleName;
        } else {
          treeNode.title += " 未命中";
        }
        break;
      case "rule":
        treeNode.title = "策略：" + chainNode.embedding.ruleName;
        treeNode.title +=
          "(优先级:" +
          chainNode.embedding.packageLevel +
          "-" +
          chainNode.embedding.level +
          ")";
        treeNode.title += "(动作：" + chainNode.embedding.actionName + ")";
        treeNode.title += chainNode.returnObject ? "(命中)" : "(未命中)";
        break;
      case "and":
        treeNode.title = "与:(" + chainNode.returnObject + ")";
        break;
      case "or":
        treeNode.title = "或:(" + chainNode.returnObject + ")";
        break;
      case "not":
        treeNode.title = "非:(" + chainNode.returnObject + ")";
        break;
      case "logic":
        // console.log(chainNode);
        treeNode.title =
          "逻辑：" +
          chainNode.embedding.name +
          "(" +
          chainNode.returnObject +
          ")";

        treeNode.children.push({
          key: treeNode.key + "_left",
          title: "左值因子:" + chainNode.embedding.left
        });
        treeNode.children.push({
          key: treeNode.key + "_value",
          title: "左值:" + chainNode.embedding.value
        });
        treeNode.children.push({
          key: treeNode.key + "_op",
          title: "操作符:" + chainNode.embedding.op
        });
        treeNode.children.push({
          key: treeNode.key + "_right",
          title: "右值:" + chainNode.embedding.right
        });
        break;
      case "time":
        treeNode.title =
          "时间:" +
          chainNode.embedding.name +
          "(" +
          chainNode.returnObject +
          ")";
        break;
      default:
        break;
    }
    if (chainNode.children != null) {
      for (let index = 0; index < chainNode.children.length; index++) {
        const element = chainNode.children[index];
        treeNode.children.push(this.toTreeNode(element, idx + "_" + index));
      }
    }
    console.log("--->" + idx);
    return treeNode;
  }

  render() {
    return <Tree treeData={this.treeData}></Tree>;
  }
}

export default RuleDebuger;
