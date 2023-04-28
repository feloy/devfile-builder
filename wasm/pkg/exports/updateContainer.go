package exports

import (
	"syscall/js"

	"github.com/devfile/api/v2/pkg/apis/workspaces/v1alpha2"
	"github.com/devfile/library/v2/pkg/devfile/parser/data/v2/common"

	"github.com/feloy/devfile-builder/wasm/pkg/global"
	"github.com/feloy/devfile-builder/wasm/pkg/utils"
)

func UpdateContainerWrapper(this js.Value, args []js.Value) interface{} {
	command := getStringArray(args[2])
	arg := getStringArray(args[3])
	userCommands := getUserCommandArray(args[4])

	return result(
		updateContainer(args[0].String(), args[1].String(), command, arg, userCommands),
	)
}

func updateContainer(name string, image string, command []string, args []string, userCommands []userCommand) (map[string]interface{}, error) {
	component := v1alpha2.Component{
		Name: name,
		ComponentUnion: v1alpha2.ComponentUnion{
			Container: &v1alpha2.ContainerComponent{
				Container: v1alpha2.Container{
					Image:   image,
					Command: command,
					Args:    args,
				},
			},
		},
	}
	global.Devfile.Data.UpdateComponent(component)

	allCommands, err := global.Devfile.Data.GetCommands(common.DevfileOptions{})
	if err != nil {
		return nil, err
	}

	// TODO(feloy) Deletion fails if done in increasing order
	for i := len(allCommands) - 1; i >= 0; i-- {
		command := allCommands[i]
		if command.Exec.Component != name {
			continue
		}
		err = global.Devfile.Data.DeleteCommand(command.Id)
		if err != nil {
			return nil, err
		}
	}

	commands := make([]v1alpha2.Command, len(userCommands))
	for i := range userCommands {
		userCommand := userCommands[i]
		newCommand := v1alpha2.Command{
			Id: userCommand.Name,
			CommandUnion: v1alpha2.CommandUnion{
				Exec: &v1alpha2.ExecCommand{
					Component:        name,
					CommandLine:      userCommand.CommandLine,
					WorkingDir:       userCommand.WorkingDir,
					HotReloadCapable: &userCommand.HotReloadCapable,
				},
			},
		}
		if userCommand.Group != "" {
			newCommand.Exec.Group = &v1alpha2.CommandGroup{
				Kind:      v1alpha2.CommandGroupKind(userCommand.Group),
				IsDefault: &userCommand.Default,
			}
		}
		commands[i] = newCommand
	}
	err = global.Devfile.Data.AddCommands(commands)
	if err != nil {
		return nil, err
	}
	return utils.GetContent()
}
